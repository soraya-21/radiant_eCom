import stripe
import json
import logging
from django.conf import settings
from django.core.cache import cache
from django.db import transaction
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from .models import Order, OrderItem
from .serializers import OrderSerializer

logger = logging.getLogger(__name__)

# Configuration de la clé secrète Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateOrderView(APIView):
    """
    Crée une commande en base de données, génère une session Stripe 
    et nettoie le cache Redis du panier.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        user = request.user
        try:
            with transaction.atomic():
                order = Order.objects.create(
                    user=request.user,
                    total_amount=data['total'],
                    status='pending'
                )

                line_items = []
                for item in data['items']:
                    OrderItem.objects.create(
                        order=order,
                        product_id=item['product'],
                        price=item['price'],
                        quantity=item['quantity']
                    )
                    
                    unit_amount = int(round(float(item['price']) * 100))
                    
                    line_items.append({
                        'price_data': {
                            'currency': 'eur',
                            'product_data': {
                                'name': item.get('product_name', 'Fragrance Radiant'),
                            },
                            'unit_amount': unit_amount,
                        },
                        'quantity': item['quantity'],
                    })

                checkout_session = stripe.checkout.Session.create(
                    customer_email=user.email,
                    payment_method_types=['card'],
                    line_items=line_items,
                    mode='payment',
                    success_url=settings.SITE_URL + '/dashboard?success=true',
                    cancel_url=settings.SITE_URL + '/cart?canceled=true',
                    metadata={'order_id': str(order.id)}  # Convertir en string
                )

                logger.info(f"Commande {order.id} créée - Session Stripe: {checkout_session.id}")
                cache.delete(f"cart_{request.user.id}")

                return Response({'stripe_url': checkout_session.url}, status=201)
                
        except Exception as e:
            logger.error(f"STRIPE ERROR: {str(e)}")
            return Response({'error': str(e)}, status=400)


class MyOrdersView(generics.ListAPIView):
    """
    Récupère l'historique des commandes de l'utilisateur connecté.
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sync_cart(request):
    user_id = request.user.id
    cart_data = request.data.get('cart', [])
    cache.set(f"cart_{user_id}", cart_data, timeout=86400)
    return Response({"status": "Panier synchronisé dans Redis"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_remote_cart(request):
    user_id = request.user.id
    cart_data = cache.get(f"cart_{user_id}")
    return Response({"cart": cart_data if cart_data else []})


@csrf_exempt
def stripe_webhook(request):
    """
    Gestionnaire du webhook Stripe pour mettre à jour le statut des commandes
    """
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    logger.info(f"Webhook reçu - Signature: {sig_header[:20]}...")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
        logger.info(f"✅ Signature valide - Event type: {event['type']}")
    except ValueError as e:
        logger.error(f"Payload invalide: {str(e)}")
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"Signature invalide: {str(e)}")
        return HttpResponse(status=400)
    except Exception as e:
        logger.error(f"Erreur webhook: {str(e)}")
        return HttpResponse(status=400)

    # Gestion de tous les événements de paiement
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        logger.info(f"Session complétée: {session.get('id')}")
        logger.info(f"Metadata: {session.get('metadata')}")
        
        order_id = session.get('metadata', {}).get('order_id')
        logger.info(f"🔍 Order ID trouvé: {order_id}")
        
        if order_id:
            try:
                # Convertir en int si c'est une string
                order_id = int(order_id) if isinstance(order_id, str) else order_id
                order = Order.objects.get(id=order_id)
                
                if order.status != 'paid':
                    order.status = 'paid'
                    order.payment_id = session.get('payment_intent')
                    order.save()
                    logger.info(f"Commande {order_id} marquée comme PAYÉE")
                else:
                    logger.info(f"Commande {order_id} déjà payée")
                    
            except Order.DoesNotExist:
                logger.error(f"Commande {order_id} introuvable en base")
            except Exception as e:
                logger.error(f"Erreur mise à jour: {str(e)}")
        else:
            logger.warning(f"Pas d'order_id dans metadata")

    elif event['type'] == 'checkout.session.async_payment_succeeded':
        # Cas des paiements asynchrones
        logger.info(f"Paiement asynchrone réussi")
        
    elif event['type'] == 'checkout.session.async_payment_failed':
        # Cas des paiements asynchrones échoués
        logger.warning(f"Paiement asynchrone échoué")
    
    else:
        logger.info(f"ℹÉvénement ignoré: {event['type']}")

    return HttpResponse(status=200)
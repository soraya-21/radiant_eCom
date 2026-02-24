from django.urls import path
from orders.views import CreateOrderView, MyOrdersView, stripe_webhook, sync_cart, get_remote_cart

urlpatterns = [
    path('create/', CreateOrderView.as_view(), name='order-create'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),

    path('sync-cart/', sync_cart, name='sync-cart'),
    path('get-cart/', get_remote_cart, name='get-cart'),

    path('webhook/', stripe_webhook, name='stripe-webhook'),
]
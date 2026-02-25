import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import api from '../api';

const mediaBase = import.meta.env.VITE_API_MEDIA_URL || 'localhost:5431';

const Cart = () => {
  const { isDark } = useTheme();
  const { cartItems, addToCart, removeFromCart, clearCart, getCartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      clearCart();
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const response = await api.post('orders/create/', {
        total: totalPrice,
        items: cartItems.map(item => ({
          product: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });

      if (response.data.stripe_url) {
        window.location.href = response.data.stripe_url;
      }
    } catch (err) {
      console.error("Erreur Checkout:", err.response?.data || err.message);
      alert("Erreur lors de la création de la commande. Vérifiez la console.");
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDark ? 'text-white' : 'text-gray-950'}`}>Votre panier est vide</h2>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Découvrez notre collection et trouvez vos produits préférés</p>
          <Link 
            to="/shop" 
            className={`inline-block py-3 px-8 rounded-lg font-semibold uppercase tracking-widest transition ${isDark ? 'bg-gold-500 hover:bg-gold-600 text-white' : 'bg-gold-700 hover:bg-gold-800 text-white'}`}
          >
            Voir la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 md:py-16 px-4 ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-4xl md:text-5xl font-serif mb-12 ${isDark ? 'text-white' : 'text-gray-950'}`}>Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ITEMS */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className={`flex gap-6 p-6 rounded-xl border-2 ${isDark ? 'bg-slate-800 border-gold-500/30' : 'bg-white border-gold-300'}`}>
                  <img
                    src={item.image ? (item.image.startsWith('https') ? item.image : `${mediaBase}${item.image}`) : ''}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>
                      {item.name}
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.category}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => item.quantity > 1 ? addToCart({...item, quantity: -1}) : removeFromCart(item.id)}
                        className={`px-3 py-1 rounded border-2 ${isDark ? 'border-gold-500/30 text-white hover:bg-slate-700' : 'border-gold-300 text-gray-950 hover:bg-gray-100'}`}
                      >
                        −
                      </button>
                      <span className={`px-4 ${isDark ? 'text-white' : 'text-gray-950'}`}>{item.quantity}</span>
                      <button
                        onClick={() => addToCart({...item, quantity: 1})}
                        className={`px-3 py-1 rounded border-2 ${isDark ? 'border-gold-500/30 text-white hover:bg-slate-700' : 'border-gold-300 text-gray-950 hover:bg-gray-100'}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-2xl font-bold mb-4 ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={`text-sm px-3 py-1 rounded transition ${isDark ? 'text-rose-400 hover:bg-rose-400/10' : 'text-rose-600 hover:bg-rose-100'}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className={`h-fit p-6 rounded-xl border-2 sticky top-24 ${isDark ? 'bg-slate-800 border-gold-500/30' : 'bg-white border-gold-300'}`}>
            <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-950'}`}>Résumé</h2>
            
            <div className={`space-y-4 mb-6 pb-6 border-b ${isDark ? 'border-gold-500/20' : 'border-gold-300'}`}>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Sous-total</span>
                <span className={isDark ? 'text-white' : 'text-gray-950'}>{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Livraison</span>
                <span className={isDark ? 'text-white' : 'text-gray-950'}>Gratuite</span>
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <span className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-950'}`}>Total</span>
              <span className={`text-3xl font-bold ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>
                {totalPrice.toFixed(2)} €
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full py-3 px-4 rounded-lg font-semibold uppercase tracking-widest transition mb-4 ${isDark ? 'bg-gold-500 hover:bg-gold-600 text-white disabled:opacity-50' : 'bg-gold-700 hover:bg-gold-800 text-white disabled:opacity-50'}`}
            >
              {isProcessing ? 'Traitement...' : 'Procéder au paiement'}
            </button>

            <Link
              to="/shop"
              className={`block text-center py-3 px-4 rounded-lg border-2 font-semibold uppercase tracking-widest transition ${isDark ? 'border-gold-500/30 text-gold-400 hover:bg-slate-700' : 'border-gold-300 text-gold-700 hover:bg-gray-100'}`}
            >
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
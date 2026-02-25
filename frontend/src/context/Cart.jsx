import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import api from '../api';

const mediaBase = import.meta.env.VITE_API_MEDIA_URL || 'localhost:5431';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartCount } = useCart();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      alert('Veuillez vous connecter pour passer une commande');
      navigate('/login');
      return;
    }

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
      console.error("Erreur Checkout:", err.response?.data);
      if (err.response?.status === 401) {
        alert('Session expirée. Veuillez vous reconnecter.');
        navigate('/login');
      } else {
        alert("Erreur lors de la création de la commande");
      }
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
            className={`inline-block px-8 py-4 rounded-lg font-bold hover:shadow-2xl hover:shadow-gold-500/50 transition transform hover:scale-105 uppercase tracking-widest text-white ${isDark ? 'bg-gold-500 hover:bg-gold-600' : 'bg-gold-600 hover:bg-gold-700'}`}
          >
            Continuer vos achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 md:py-16 px-4 ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-4xl md:text-5xl font-serif mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>Mon Panier</h1>
        <p className={`text-sm mb-10 uppercase tracking-widest font-semibold ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>
          {getCartCount()} article{getCartCount() > 1 ? 's' : ''} dans votre panier
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* CART ITEMS */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 backdrop-blur border p-4 sm:p-6 rounded-xl hover:border-gold-400/50 transition ${isDark ? 'bg-slate-800/50 border-gold-500/20' : 'bg-white/50 border-gold-200'}`}
                >
                  {/* PRODUCT IMAGE */}
                  <div className="w-full sm:w-24 flex-shrink-0">
                    <img
                      src={item.image ? (item.image.startsWith('http') ? item.image : `${mediaBase}${item.image}`) : 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className="w-full sm:w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex-grow w-full sm:w-auto">
                    <h3 className={`text-lg sm:text-base font-bold mb-1 md:mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>{item.name}</h3>
                    <p className={`text-sm md:text-base font-semibold mb-3 md:mb-4 ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>{item.price} €</p>

                    {/* QUANTITY SELECTOR */}
                    <div className={`flex items-center gap-2 rounded-lg w-fit p-1 ${isDark ? 'bg-slate-900/50 border border-gold-500/20' : 'bg-gray-100 border border-gold-200'}`}>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className={`px-3 py-2 transition font-bold ${isDark ? 'text-gray-400 hover:text-gold-400' : 'text-gray-700 hover:text-gold-700'}`}
                      >
                        −
                      </button>
                      <span className={`px-4 py-2 font-bold ${isDark ? 'text-white' : 'text-gray-950'}`}>{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)} 
                        className={`px-3 py-2 transition font-bold ${isDark ? 'text-gray-400 hover:text-gold-400' : 'text-gray-700 hover:text-gold-700'}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* PRICE & REMOVE */}
                  <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
                    <p className={`text-2xl sm:text-xl font-bold ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={`text-sm font-semibold transition ${isDark ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'}`}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className={`mt-8 w-full sm:w-auto text-sm font-semibold transition border-t pt-6 ${isDark ? 'text-gray-400 hover:text-gray-300 border-gold-500/20' : 'text-gray-700 hover:text-gray-900 border-gold-300'}`}
            >
              Vider le panier
            </button>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-1">
            <div className={`backdrop-blur border p-6 md:p-8 rounded-xl sticky top-24 space-y-6 ${isDark ? 'bg-slate-800/50 border-gold-500/20' : 'bg-white/50 border-gold-200'}`}>
              <h2 className={`text-2xl font-serif ${isDark ? 'text-white' : 'text-gray-950'}`}>Résumé</h2>

              <div className={`space-y-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className={isDark ? 'text-gold-400' : 'text-gold-700'}>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className={`font-semibold ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>Gratuite</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA</span>
                  <span className={isDark ? 'text-gold-400' : 'text-gold-700'}>{(totalPrice * 0.2).toFixed(2)} €</span>
                </div>
              </div>

              <div className={`border-t pt-6 ${isDark ? 'border-gold-500/20' : 'border-gold-300'}`}>
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-950'}`}>Total TTC</span>
                  <span className={`text-3xl md:text-2xl font-bold ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>
                    {(totalPrice * 1.2).toFixed(2)} €
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full py-4 font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-gold-500/50 transition transform hover:scale-105 uppercase tracking-widest text-white ${isDark ? 'bg-gold-500 hover:bg-gold-600 disabled:opacity-50' : 'bg-gold-600 hover:bg-gold-700 disabled:opacity-50'}`}
                >
                  {isProcessing ? 'Traitement...' : 'Passer la commande'}
                </button>

                <p className={`text-center text-xs mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Paiement sécurisé via Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
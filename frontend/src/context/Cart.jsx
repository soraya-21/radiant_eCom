import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import api from '../api';

const mediaBase = import.meta.env.VITE_API_MEDIA_URL || 'localhost:5431';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

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
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Votre panier est vide</h2>
          <p className="text-gray-400 mb-8">Découvrez notre collection et trouvez vos produits préférés</p>
          <Link 
            to="/shop" 
            className="inline-block bg-gradient-to-r from-gold-500 to-rose-500 text-white px-8 py-4 rounded-lg font-bold hover:shadow-2xl hover:shadow-gold-500/50 transition transform hover:scale-105 uppercase tracking-widest"
          >
            Continuer vos achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">Mon Panier</h1>
        <p className="text-gold-400 text-sm mb-10 uppercase tracking-widest font-semibold">
          {getCartCount()} article{getCartCount() > 1 ? 's' : ''} dans votre panier
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* CART ITEMS */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-slate-800/50 backdrop-blur border border-gold-500/20 p-4 sm:p-6 rounded-xl hover:border-gold-400/50 transition"
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
                    <h3 className="text-lg sm:text-base font-bold text-white mb-1 md:mb-2">{item.name}</h3>
                    <p className="text-gold-400 text-sm md:text-base font-semibold mb-3 md:mb-4">{item.price} €</p>

                    {/* QUANTITY SELECTOR */}
                    <div className="flex items-center gap-2 bg-slate-900/50 border border-gold-500/20 rounded-lg w-fit p-1">
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="px-3 py-2 text-gray-400 hover:text-gold-400 transition font-bold"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-bold text-white">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)} 
                        className="px-3 py-2 text-gray-400 hover:text-gold-400 transition font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* PRICE & REMOVE */}
                  <div className="flex flex-col items-end gap-4 w-full sm:w-auto">
                    <p className="text-2xl sm:text-xl font-bold bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-rose-400 hover:text-rose-300 text-sm font-semibold transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-8 w-full sm:w-auto text-gray-400 hover:text-gray-300 text-sm font-semibold transition border-t border-gold-500/20 pt-6"
            >
              Vider le panier
            </button>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-gold-500/20 p-6 md:p-8 rounded-xl sticky top-24 space-y-6">
              <h2 className="text-2xl font-serif text-white">Résumé</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Livraison</span>
                  <span className="text-gold-400 font-semibold">Gratuite</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>TVA</span>
                  <span>{(totalPrice * 0.2).toFixed(2)} €</span>
                </div>
              </div>

              <div className="border-t border-gold-500/20 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg text-white font-semibold">Total TTC</span>
                  <span className="text-3xl md:text-2xl font-bold bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent">
                    {(totalPrice * 1.2).toFixed(2)} €
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full bg-gradient-to-r from-gold-500 to-rose-500 text-white py-4 font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-gold-500/50 transition transform hover:scale-105 uppercase tracking-widest ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? 'Traitement...' : 'Passer la commande'}
                </button>

                <p className="text-center text-gray-400 text-xs mt-4">Paiement sécurisé via Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
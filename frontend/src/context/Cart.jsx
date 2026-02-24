import React from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartCount } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      // ON UTILISE L'URL QUI CORRESPOND À TON URLS.PY : 'orders/create/'
      const response = await api.post('orders/create/', {
        total: totalPrice,
        items: cartItems.map(item => ({
          product: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });

      // Redirection directe vers Stripe via l'URL générée par le backend
      if (response.data.stripe_url) {
        window.location.href = response.data.stripe_url;
      }
    } catch (err) {
      console.error("Erreur Checkout:", err.response?.data || err.message);
      alert("Erreur lors de la création de la commande. Vérifiez la console.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-20 text-center">
        <h2 className="text-3xl font-serif mb-4 text-gray-800">Votre panier est vide</h2>
        <a href="/" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
          Boutique
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-serif mb-10 text-gray-900 italic">Mon Panier ({getCartCount()})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <img 
                src={item.image ? (item.image.startsWith('http') ? item.image :`${mediaBase}${item.image}`) : 'https://via.placeholder.com/100'} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="ml-6 flex-grow">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{item.price} €</p>
                <div className="flex items-center border border-gray-200 rounded-full w-fit px-3 py-1">
                  <button onClick={() => removeFromCart(item.id)} className="px-2 text-gray-400 hover:text-black">－</button>
                  <span className="mx-2 font-bold">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="px-2 text-gray-400 hover:text-black">＋</button>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">{(item.price * item.quantity).toFixed(2)} €</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-3xl h-fit border border-gray-200">
          <h2 className="text-xl font-bold mb-6">Résumé</h2>
          <div className="border-t pt-4 flex justify-between items-end mb-8">
            <span className="text-lg">Total</span>
            <span className="text-3xl font-bold">{totalPrice.toFixed(2)} €</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition shadow-xl"
          >
            Payer la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
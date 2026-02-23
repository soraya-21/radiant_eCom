import React, { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Cart = () => {
  const { cartItems, getCartCount, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Veuillez vous connecter pour finaliser votre commande.");
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: totalPrice
      };

      const response = await api.post('orders/create/', orderData);
      
      if (response.data.stripe_url) {
        window.location.href = response.data.stripe_url;
      }
    } catch (err) {
      console.error("Erreur Checkout:", err.response?.data);
      alert("Une erreur est survenue lors de l'initialisation du paiement.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-32 text-center">
        <h2 className="text-2xl font-serif uppercase tracking-widest text-indigo-950 mb-8">Votre sac est vide</h2>
        <Link to="/" className="text-sm border-b border-indigo-900 pb-1 hover:text-indigo-600 transition">
          Retourner à la collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-serif uppercase tracking-widest text-indigo-950 mb-12 text-center">Votre Panier</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-6 border-b pb-8">
              <img src={item.image} alt={item.name} className="w-24 h-32 object-cover" />
              <div className="flex-grow">
                <h3 className="text-sm uppercase tracking-widest font-bold">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.price} €</p>
                <p className="text-xs italic">Quantité : {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 h-fit shadow-sm">
          <h2 className="text-lg uppercase tracking-widest mb-6 font-bold font-serif">Résumé de la commande</h2>
          <div className="flex justify-between pt-6 mb-8 font-bold text-lg border-t">
            <span>Total</span>
            <span>{totalPrice} €</span>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full bg-indigo-950 text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-black transition-all"
          >
            Payer avec Stripe
          </button>
          <p className="text-[10px] text-gray-400 mt-6 text-center italic">
            Vous allez être redirigé vers une plateforme de paiement sécurisée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
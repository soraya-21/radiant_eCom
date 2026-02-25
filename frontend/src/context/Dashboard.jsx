import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.loggedIn) {
      navigate('/login');
      return;
    }

    api.get('orders/my-orders/')
      .then(res => {
        setOrders(res.data || []);
      })
      .catch(err => {
        console.error("Erreur récupération commandes:", err);
        setError("Impossible de charger les commandes");
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) {
    return (
      <div className={`min-h-screen py-20 text-center ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mb-4"></div>
        <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>Chargement de vos commandes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen py-20 text-center ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <p className={isDark ? 'text-red-400' : 'text-red-600'}>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">📦</div>
          <h2 className={`text-3xl md:text-4xl font-serif mb-4 ${isDark ? 'text-white' : 'text-gray-950'}`}>Aucune commande</h2>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Vous n'avez pas encore de commande. Découvrez notre collection !</p>
          <a 
            href="/shop" 
            className={`inline-block py-3 px-8 rounded-lg font-semibold uppercase tracking-widest transition ${isDark ? 'bg-gold-500 hover:bg-gold-600 text-white' : 'bg-gold-700 hover:bg-gold-800 text-white'}`}
          >
            Voir la boutique
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 md:py-16 px-4 ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-4xl md:text-5xl font-serif mb-12 ${isDark ? 'text-white' : 'text-gray-950'}`}>Mes Commandes</h1>

        <div className="space-y-6">
          {orders.map(order => {
            const totalAmount = typeof order.total_amount === 'string' 
              ? parseFloat(order.total_amount) 
              : order.total_amount;

            return (
              <div key={order.id} className={`p-6 md:p-8 rounded-xl border-2 ${isDark ? 'bg-slate-800 border-gold-500/30' : 'bg-white border-gold-300'}`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-600">
                  <div>
                    <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>N° Commande</p>
                    <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-950'}`}>#{order.id}</p>
                  </div>
                  <div>
                    <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date</p>
                    <p className={isDark ? 'text-white' : 'text-gray-950'}>{new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Statut</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.paid ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800') : (isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800')}`}>
                      {order.paid ? 'Payée' : 'En attente'}
                    </div>
                  </div>
                  <div>
                    <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>{totalAmount.toFixed(2)} €</p>
                  </div>
                </div>

                {Array.isArray(order.items) && order.items.length > 0 && (
                  <div>
                    <p className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Articles :</p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className={`flex justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span>{item.product_name} × {item.quantity}</span>
                          <span>{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
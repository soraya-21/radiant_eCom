import React, { useEffect, useState } from 'react';
import api from '../api';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('orders/my-orders/');
        setOrders(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des commandes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
        <p className="ml-4 text-gray-600">Chargement de vos commandes Radiant...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-serif mb-8 text-gray-800">Mon Compte</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            📦 Historique des commandes
          </h2>
          
          {orders.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500">
              Vous n'avez pas encore passé de commande sur Radiant.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start border-b border-gray-50 pb-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Commande</p>
                      <p className="text-lg font-mono font-bold text-gray-700">#RDN-{order.id}</p>
                      <p className="text-sm text-gray-500">Passée le {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status === 'paid' ? 'PAYÉE' : 'EN ATTENTE'}
                      </span>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{order.total_amount} €</p>
                    </div>
                  </div>

                  {/* DÉTAILS DES ARTICLES */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase">Articles</p>
                    {order.items && order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">x{item.quantity}</span>
                          <span className="text-gray-700 font-medium">{item.product_name}</span>
                        </div>
                        <span className="text-gray-900 font-bold">{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
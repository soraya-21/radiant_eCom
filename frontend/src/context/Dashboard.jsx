import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
          <p className="text-gray-400 italic">Chargement de vos commandes Radiant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">
            Mes Commandes
          </h1>
          <p className="text-gold-400 text-sm uppercase tracking-widest font-semibold">
            Historique de vos achats sur Radiant
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-slate-800 border-2 border-gold-500 p-8 md:p-12 rounded-xl text-center">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-2xl font-serif text-white mb-3">Aucune commande</h2>
            <p className="text-gray-400 mb-8">Vous n'avez pas encore passé de commande sur Radiant.</p>
            <Link
              to="/shop"
              className="inline-block bg-gradient-to-r from-gold-500 to-rose-500 text-white px-8 py-3 rounded-lg font-bold hover:shadow-2xl hover:shadow-gold-500/50 transition transform hover:scale-105 uppercase tracking-widest text-sm border-2 border-gold-400"
            >
              Découvrir la collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-800 border-2 border-gold-500 rounded-xl p-6 md:p-8 hover:border-gold-400 transition"
              >
                {/* HEADER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 pb-6 border-b-2 border-gold-500">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2">
                      Numéro de commande
                    </p>
                    <p className="text-xl md:text-2xl font-mono font-bold text-white">
                      #RDN-{order.id}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(order.created_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2">
                      Statut
                    </p>
                    <div className="flex items-center justify-start sm:justify-end gap-3 mb-3">
                      {order.status === 'paid' ? (
                        <>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-green-400 font-bold uppercase tracking-widest text-sm">
                            Payée
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
                          <span className="text-orange-400 font-bold uppercase tracking-widest text-sm">
                            En attente
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent">
                      {order.total_amount.toFixed(2)} €
                    </p>
                  </div>
                </div>

                {/* ITEMS */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">
                    Articles commandés
                  </p>
                  <div className="space-y-3">
                    {order.items && order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-slate-700 border border-gold-500/50 rounded-lg">
                        <div className="flex items-center gap-4 flex-grow">
                          <span className="bg-gold-500/30 border border-gold-500 text-gold-400 px-3 py-1 rounded font-bold text-sm">
                            ×{item.quantity}
                          </span>
                          <span className="text-white font-medium">{item.product_name}</span>
                        </div>
                        <span className="text-gold-400 font-bold text-sm md:text-base">
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
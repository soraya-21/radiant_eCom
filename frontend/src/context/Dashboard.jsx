import React, { useEffect, useState } from 'react';
import api from '../api';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { clearCart } = useCart();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('success')) {
            clearCart(); // Vide le panier local et Redis (via le cleanup d'URL)
        }

        // Récupérer les commandes
        api.get('orders/my-orders/')
            .then(res => {
                console.log("Données reçues de Django :", res.data);
                setOrders(res.data);
            })
            .catch(err => {
                console.error("Erreur lors de la récupération des commandes:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location.search, clearCart]);

    if (loading) return (
        <div className="flex justify-center items-center h-64 italic text-gray-400 tracking-widest">
            Chargement de vos rituels Radiant...
        </div>
    );

    return (
        <div className="container mx-auto py-16 px-4">
            <header className="mb-12 text-center">
                <h1 className="text-3xl font-serif uppercase tracking-[0.3em] text-indigo-950">Mon Espace</h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Historique des commandes</p>
                <div className="w-12 h-px bg-indigo-900 mx-auto mt-4"></div>
            </header>

            <div className="max-w-4xl mx-auto">
                {orders.length === 0 ? (
                    <div className="text-center py-12 border border-dashed rounded-sm">
                        <p className="text-gray-500 italic">Aucune commande enregistrée pour le moment.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                                <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                                    <div>
                                        <span className="text-[9px] uppercase tracking-tighter text-gray-400 block">Date</span>
                                        <span className="text-xs font-bold">{new Date(order.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="text-[9px] uppercase tracking-tighter text-gray-400 block">Total</span>
                                        <span className="text-xs font-bold text-indigo-900">{order.total_amount} €</span>
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest px-3 py-1 bg-indigo-950 text-white rounded-full">
                                        {order.status}
                                    </span>
                                </div>
                                
                                <div className="p-6">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-[10px] uppercase text-gray-400 border-b">
                                                <th className="pb-2 font-medium">Produit</th>
                                                <th className="pb-2 font-medium text-center">Qté</th>
                                                <th className="pb-2 font-medium text-right">Prix</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {order.items && order.items.map(item => (
                                                <tr key={item.id} className="text-sm">
                                                    <td className="py-3 font-medium text-gray-800">{item.product_name}</td>
                                                    <td className="py-3 text-center text-gray-500">{item.quantity}</td>
                                                    <td className="py-3 text-right text-indigo-950 font-medium">{item.price} €</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
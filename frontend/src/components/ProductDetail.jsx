import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api';

const mediaBase = import.meta.env.VITE_API_MEDIA_URL || 'localhost:5431';

const ProductDetail = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className={`py-20 text-center ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      <p className={`italic mt-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Préparation du produit...</p>
    </div>
  );

  if (!product) return (
    <div className={`py-20 text-center min-h-screen ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>Produit introuvable.</p>
      <Link to="/shop" className={`mt-4 inline-block ${isDark ? 'text-gold-400 hover:text-gold-300' : 'text-gold-700 hover:text-gold-800'}`}>← Retour à la boutique</Link>
    </div>
  );

  return (
    <div className={`min-h-screen py-12 md:py-16 px-4 ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/shop" 
          className={`text-xs md:text-sm uppercase tracking-widest mb-8 inline-flex items-center gap-2 transition ${isDark ? 'text-gold-400 hover:text-gold-300' : 'text-gold-700 hover:text-gold-800'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* IMAGE */}
          <div className={`p-6 md:p-8 rounded-xl border-2 sticky top-24 ${isDark ? 'bg-slate-800 border-gold-500/30' : 'bg-white border-gold-300'}`}>
            <img
              src={product.image ? (product.image.startsWith('https') ? product.image : `${mediaBase}${product.image}`) : ''}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className={`text-4xl md:text-5xl font-serif mb-4 ${isDark ? 'text-white' : 'text-gray-950'}`}>
              {product.name}
            </h1>

            <p className={`text-lg mb-6 ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>
              {product.category}
            </p>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xl ${isDark ? 'text-gold-400' : 'text-gold-600'}`}>★</span>
                ))}
              </div>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>(5.0)</span>
            </div>

            <p className={`text-5xl font-bold mb-8 ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>
              {product.price} €
            </p>

            <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => addToCart(product)}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold uppercase tracking-widest transition border-2 ${isDark ? 'bg-gold-500 hover:bg-gold-600 text-white border-gold-500' : 'bg-gold-600 hover:bg-gold-700 text-white border-gold-600'}`}
              >
                Ajouter au panier
              </button>
              <button
                className={`flex-1 py-4 px-6 rounded-lg font-semibold uppercase tracking-widest transition border-2 ${isDark ? 'border-gold-500 text-gold-400 hover:bg-gold-500/10' : 'border-gold-600 text-gold-700 hover:bg-gold-100'}`}
              >
                ♡ Ajouter à la liste
              </button>
            </div>

            <div className={`border-t border-b py-6 ${isDark ? 'border-gold-500/20' : 'border-gold-300'}`}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type</p>
                  <p className={isDark ? 'text-white' : 'text-gray-950'}>Soin</p>
                </div>
                <div>
                  <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Format</p>
                  <p className={isDark ? 'text-white' : 'text-gray-950'}>50ml</p>
                </div>
                <div>
                  <p className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Disponibilité</p>
                  <p className={isDark ? 'text-green-400' : 'text-green-700'}>En stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
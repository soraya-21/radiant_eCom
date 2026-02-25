import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api';

const mediaBase = import.meta.env.VITE_API_MEDIA_URL || 'localhost:5431';

const ProductDetail = () => {
  const { id } = useParams();
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
    <div className="py-20 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
      <p className="text-gray-400 italic mt-4">Préparation du produit...</p>
    </div>
  );

  if (!product) return (
    <div className="py-20 text-center bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen">
      <p className="text-gray-400">Produit introuvable.</p>
      <Link to="/shop" className="text-gold-400 hover:text-gold-300 mt-4 inline-block">← Retour à la boutique</Link>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/shop" 
          className="text-xs md:text-sm uppercase tracking-widest text-gold-400 hover:text-gold-300 mb-8 inline-flex items-center gap-2 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* IMAGE */}
          <div className="bg-slate-800 p-6 md:p-8 rounded-xl border-2 border-gold-500 sticky top-24">
            <img
              src={product.image ? (product.image.startsWith('https') ? product.image : `${mediaBase}${product.image}`) : ''}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-8">
            <div>
              <p className="text-sm md:text-base text-gold-400 uppercase tracking-widest font-semibold mb-3">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(Basé sur 24 avis)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <p className="text-5xl font-bold bg-gradient-to-r from-gold-400 to-rose-400 bg-clip-text text-transparent">
                  {product.price} €
                </p>
                <span className="text-gray-500 text-lg line-through">{parseFloat(product.price) + 10} €</span>
              </div>
              <p className="text-rose-400 font-semibold text-sm">Économisez 10€ sur ce produit</p>
            </div>

            <div className="border-t-2 border-b-2 border-gold-500 py-6 space-y-3">
              <h3 className="text-white font-semibold mb-4">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description || "Une création olfactive unique, mêlant notes rares et élégance intemporelle. Conçu pour sublimer votre beauté naturelle avec des ingrédients premium sélectionnés avec soin."}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Formule respectueuse de la peau</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Résultats visibles en 2-4 semaines</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Livraison rapide et sécurisée</span>
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-gradient-to-r from-gold-500 to-rose-500 text-white py-4 md:py-5 font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-gold-500/50 transition transform hover:scale-105 uppercase tracking-widest border-2 border-gold-400"
            >
              Ajouter au panier
            </button>

            <button className="w-full border-2 border-gold-500 text-gold-400 py-4 md:py-5 font-bold text-lg rounded-lg hover:bg-gold-500/10 transition uppercase tracking-widest">
              ❤ Ajouter à la liste d'envies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
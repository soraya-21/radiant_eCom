import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-20 text-center italic">Préparation de la fragrance...</div>;
  if (!product) return <div className="py-20 text-center">Produit introuvable.</div>;

  return (
    <div className="container mx-auto py-16 px-4">
      <Link to="/" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-indigo-900 mb-8 inline-block">
        ← Retour à la collection
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="bg-gray-50 p-4">
          <img 
            src={product.image || 'https://via.placeholder.com/600x800'} 
            alt={product.name} 
            className="w-full h-auto shadow-2xl"
          />
        </div>
        
        <div className="space-y-6">
          <p className="text-sm text-indigo-600 uppercase tracking-widest">{product.category}</p>
          <h1 className="text-4xl font-serif text-indigo-950 uppercase tracking-tighter">{product.name}</h1>
          <p className="text-2xl font-light text-gray-800">{product.price} €</p>
          <div className="w-12 h-px bg-indigo-900 my-8"></div>
          <p className="text-gray-600 leading-relaxed italic">
            {product.description || "Une création olfactive unique signée Dezel, mêlant notes rares et élégance intemporelle."}
          </p>
          
          <button className="w-full bg-indigo-950 text-white py-4 uppercase tracking-[0.2em] text-sm hover:bg-indigo-800 transition shadow-lg">
            Ajouter au rituel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
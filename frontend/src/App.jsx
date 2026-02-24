import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import api from './api';
import { AuthContext } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';
import Cart from './context/Cart';
import Dashboard from './context/Dashboard';
const mediaBase = import.meta.env.VITE_API_MEDIA_URL || 'localhost:5431';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erreur collection:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20 italic text-gray-400">Chargement de la collection Radiant...</div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-16 text-center">
        <h2 className="text-3xl font-light tracking-[0.4em] uppercase text-indigo-950">La Collection</h2>
        <div className="w-12 h-px bg-indigo-900 mx-auto mt-4"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {products.map(product => (
          <div key={product.id} className="group flex flex-col">
            <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gray-50 mb-6 relative aspect-[3/4]">
              <img 
                src={product.image ? (product.image.startsWith('https') ? product.image : `${mediaBase}${product.image}`) : ''} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
            </Link>

            <div className="text-center flex-grow">
              <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-gray-900">{product.name}</h3>
              <p className="text-xs text-gray-500 italic mt-1">{product.category || "Eau de Parfum"}</p>
              <p className="text-indigo-900 font-bold mt-3 mb-4">{product.price} €</p>
            </div>

            <button 
              onClick={() => addToCart(product)}
              className="w-full border border-indigo-950 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-indigo-950 hover:text-white transition-colors duration-300"
            >
              Ajouter à la carte
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="border-b p-6 flex justify-between items-center bg-white sticky top-0 z-50">
        <Link to="/" className="text-2xl font-serif tracking-[0.3em] uppercase text-indigo-950">
          Radiant
        </Link>
        
        <div className="flex items-center space-x-8 text-[10px] uppercase tracking-widest font-bold text-indigo-950">
          <Link to="/" className="hover:text-indigo-600 transition">Boutique</Link>
          
          {/* ICONE PANIER DYNAMIQUE */}
          <Link to="/cart" className="relative group p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:text-indigo-600 transition">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-indigo-900 text-white text-[7px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse-once">
              {getCartCount()}
            </span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="hover:text-indigo-600 transition">Commandes</Link>
              <button 
                onClick={logout} 
                className="text-red-700 hover:text-red-500 transition border-l pl-6 border-gray-200"
              >
                Deconnexion
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-indigo-600 transition">Connexion</Link>
              <Link to="/register" className="border border-indigo-950 px-5 py-2 hover:bg-indigo-950 hover:text-white transition">
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={
            <div className="text-center py-20 italic text-gray-500 uppercase tracking-[0.2em]">
              Votre panier est actuellement en cours de préparation.
            </div>
          } />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-12 mt-20 text-center">
        <p className="text-[9px] uppercase tracking-[0.5em] text-gray-400">
          &copy; 2026 Radiant Skincare &middot; Tous droits réservés
        </p>
      </footer>
    </div>
  );
}

export default App;
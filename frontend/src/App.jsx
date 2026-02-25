import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import api from './api';
import { AuthContext } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Home from './components/Home';
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

  if (loading) return (
    <div className="flex justify-center py-20 text-gray-300">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mb-4"></div>
        <p className="italic text-gray-400">Chargement de la collection Radiant...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-serif tracking-wider uppercase text-white mb-4 animate-fade-in">
            Notre Collection
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-8 h-px bg-gold-500"></div>
            <div className="w-2 h-px bg-rose-500"></div>
            <div className="w-8 h-px bg-gold-500"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map(product => (
            <div key={product.id} className="group flex flex-col h-full">
              <Link 
                to={`/product/${product.id}`} 
                className="block overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 mb-6 relative aspect-[3/4] rounded-xl border border-gold-500/20 hover:border-gold-400/50 transition-all duration-300"
              >
                <img
                  src={product.image ? (product.image.startsWith('https') ? product.image : `${mediaBase}${product.image}`) : ''}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <div className="text-center flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-base md:text-lg uppercase tracking-widest font-semibold text-white mb-2 group-hover:text-gold-400 transition">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gold-400 italic mb-3">{product.category}</p>
                </div>
                <p className="text-xl md:text-2xl font-bold text-gold-400 mb-6">
                  {product.price} €
                </p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full border-2 border-gold-500 text-gold-400 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-gradient-to-r hover:from-gold-500 hover:to-rose-500 hover:text-white hover:border-transparent transition-all duration-300 rounded-lg"
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun produit disponible pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen font-sans text-gray-900 ${isHome ? 'bg-slate-950' : 'bg-slate-950'}`}>
      {/* NAVBAR */}
      <nav className={`sticky top-0 z-50 ${isHome ? 'bg-transparent' : 'bg-slate-950/95 backdrop-blur border-b border-gold-500/20'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-serif tracking-widest uppercase text-white hover:text-gold-400 transition"
          >
            Radiant
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4 md:gap-8 text-xs md:text-sm uppercase tracking-widest font-semibold text-white">
            <Link 
              to="/shop" 
              className="hover:text-gold-400 transition"
            >
              Boutique
            </Link>

            {/* CART ICON */}
            <Link to="/cart" className="relative group p-2 hover:text-gold-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-rose-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4 md:gap-6">
                <Link 
                  to="/dashboard" 
                  className="hover:text-gold-400 transition"
                >
                  Commandes
                </Link>
                <button
                  onClick={logout}
                  className="text-rose-400 hover:text-rose-300 transition border-l border-gray-600 pl-4 md:pl-6"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 md:gap-4">
                <Link 
                  to="/login" 
                  className="hover:text-gold-400 transition"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="border border-gold-500 px-4 py-2 hover:bg-gold-500 hover:text-slate-950 transition rounded-lg"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center gap-4">
            {/* CART ICON MOBILE */}
            <Link to="/cart" className="relative group p-2 hover:text-gold-400 transition text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-rose-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* HAMBURGER BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold-400 transition p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-gold-500/20 p-4 space-y-4">
            <Link 
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-widest py-2"
            >
              Boutique
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-widest py-2 border-b border-gold-500/20"
                >
                  Mes Commandes
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-widest py-2"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-widest py-2"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-widest py-2 border-t border-gold-500/20 pt-4"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      <main className="min-h-[calc(100vh-200px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-gold-500/20 py-12 md:py-16 mt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-gold-400 font-semibold mb-3 text-sm md:text-base">À Propos</h3>
              <p className="text-gray-400 text-xs md:text-sm">Soins premium pour une belle naturelle</p>
            </div>
            <div className="text-center">
              <h3 className="text-gold-400 font-semibold mb-3 text-sm md:text-base">Contact</h3>
              <p className="text-gray-400 text-xs md:text-sm">contact@radiant.com</p>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-gold-400 font-semibold mb-3 text-sm md:text-base">Suivez-nous</h3>
              <p className="text-gray-400 text-xs md:text-sm">@radiant_skincare</p>
            </div>
          </div>
          <div className="border-t border-gold-500/20 pt-8 text-center">
            <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500">
              &copy; 2026 Radiant Skincare &middot; Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import api from './api';
import { AuthContext } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useTheme } from './context/ThemeContext';
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
  const { isDark } = useTheme();

  useEffect(() => {
    api.get('products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erreur collection:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className={`flex justify-center py-20 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500 mb-4"></div>
        <p className={`italic ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Chargement de la collection Radiant...</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'} py-12 md:py-20 px-4 md:px-6`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-20 text-center">
          <h2 className={`text-4xl md:text-6xl font-serif tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-950'} mb-4 animate-fade-in`}>
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
                className={`block overflow-hidden ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-white border border-gray-200'} mb-6 relative aspect-[3/4] rounded-xl hover:shadow-2xl transition-all duration-300`}
              >
                <img
                  src={product.image ? (product.image.startsWith('https') ? product.image : `${mediaBase}${product.image}`) : ''}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black/60 via-black/0 to-transparent' : 'bg-gradient-to-t from-white/40 via-white/0 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </Link>

              <div className={`text-center flex-grow flex flex-col justify-between py-4`}>
                <div>
                  <h3 className={`text-base md:text-lg uppercase tracking-widest font-semibold ${isDark ? 'text-white' : 'text-gray-950'} group-hover:text-gold-500 transition mb-2`}>
                    {product.name}
                  </h3>
                  <p className={`text-xs md:text-sm italic mb-3 ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>{product.category}</p>
                </div>
                <p className={`text-xl md:text-2xl font-bold ${isDark ? 'text-gold-400' : 'text-gold-700'} mb-6`}>
                  {product.price} €
                </p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className={`w-full border-2 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest font-bold rounded-lg transition-all duration-300 ${isDark ? 'border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-white' : 'border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white'}`}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Aucun produit disponible pour le moment.</p>
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
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-gray-950'}`}>
      {/* NAVBAR */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isDark ? (isHome ? 'bg-transparent' : 'bg-slate-950/95 backdrop-blur border-b border-gold-500/30') : (isHome ? 'bg-transparent' : 'bg-white/95 backdrop-blur border-b border-gold-200')}`}>
        <div className={`max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center`}>
          <Link 
            to="/" 
            className={`text-2xl md:text-3xl font-serif tracking-widest uppercase ${isDark ? 'text-white hover:text-gold-400' : 'text-gray-950 hover:text-gold-600'} transition`}
          >
            Radiant
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-gold-400' : 'bg-gray-100 hover:bg-gray-200 text-gold-700'}`}
              title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 7a3 3 0 110 6 3 3 0 010-6zm-4.22 8.22a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM2 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <div className={`hidden md:flex items-center gap-4 md:gap-8 text-xs md:text-sm uppercase tracking-widest font-semibold ${isDark ? 'text-white' : 'text-gray-950'}`}>
              <Link 
                to="/shop" 
                className={`${isDark ? 'hover:text-gold-400' : 'hover:text-gold-600'} transition`}
              >
                Boutique
              </Link>

              {/* CART ICON */}
              <Link to="/cart" className={`relative group p-2 ${isDark ? 'hover:text-gold-400' : 'hover:text-gold-600'} transition`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center gap-4 md:gap-6">
                  <Link 
                    to="/dashboard" 
                    className={`${isDark ? 'hover:text-gold-400' : 'hover:text-gold-600'} transition`}
                  >
                    Commandes
                  </Link>
                  <button
                    onClick={logout}
                    className={`text-rose-500 hover:text-rose-600 transition ${isDark ? 'border-l border-gray-600 pl-4 md:pl-6' : 'border-l border-gray-300 pl-4 md:pl-6'}`}
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 md:gap-4">
                  <Link 
                    to="/login" 
                    className={`${isDark ? 'hover:text-gold-400' : 'hover:text-gold-600'} transition`}
                  >
                    Connexion
                  </Link>
                  <Link 
                    to="/register" 
                    className={`border-2 px-4 py-2 rounded-lg transition ${isDark ? 'border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-white' : 'border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white'}`}
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>

            {/* HAMBURGER MENU */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${isDark ? 'text-gold-400 hover:bg-slate-800' : 'text-gold-700 hover:bg-gray-100'} rounded-lg`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${isDark ? 'border-gold-500/30 bg-slate-900' : 'border-gold-200 bg-gray-50'}`}>
            <div className={`px-4 py-3 space-y-3 max-w-7xl mx-auto`}>
              <Link 
                to="/shop" 
                className={`block py-2 text-sm uppercase tracking-widest font-semibold ${isDark ? 'text-white hover:text-gold-400' : 'text-gray-950 hover:text-gold-600'} transition`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Boutique
              </Link>
              <Link 
                to="/cart" 
                className={`block py-2 text-sm uppercase tracking-widest font-semibold ${isDark ? 'text-white hover:text-gold-400' : 'text-gray-950 hover:text-gold-600'} transition`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Panier ({getCartCount()})
              </Link>
              {user && (
                <Link 
                  to="/dashboard" 
                  className={`block py-2 text-sm uppercase tracking-widest font-semibold ${isDark ? 'text-white hover:text-gold-400' : 'text-gray-950 hover:text-gold-600'} transition`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mes Commandes
                </Link>
              )}
              {!user && (
                <>
                  <Link 
                    to="/login" 
                    className={`block py-2 text-sm uppercase tracking-widest font-semibold ${isDark ? 'text-white hover:text-gold-400' : 'text-gray-950 hover:text-gold-600'} transition`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link 
                    to="/register" 
                    className={`block py-2 text-sm uppercase tracking-widest font-semibold ${isDark ? 'text-white hover:text-gold-400' : 'text-gray-950 hover:text-gold-600'} transition`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </>
              )}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 text-sm uppercase tracking-widest font-semibold text-rose-500 hover:text-rose-600 transition`}
                >
                  Déconnexion
                </button>
              )}
            </div>
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
      <footer className={`border-t py-12 md:py-16 mt-20 px-4 ${isDark ? 'bg-slate-950 border-gold-500/30' : 'bg-gray-50 border-gold-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
            <div className="text-center md:text-left">
              <h3 className={`font-semibold mb-3 text-sm md:text-base ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>À Propos</h3>
              <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>Soins premium pour une belle naturelle</p>
            </div>
            <div className="text-center">
              <h3 className={`font-semibold mb-3 text-sm md:text-base ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>Contact</h3>
              <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>contact@radiant.com</p>
            </div>
            <div className="text-center md:text-right">
              <h3 className={`font-semibold mb-3 text-sm md:text-base ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>Suivez-nous</h3>
              <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>@radiant_skincare</p>
            </div>
          </div>
          <div className={`border-t pt-8 text-center ${isDark ? 'border-gold-500/30' : 'border-gold-200'}`}>
            <p className={`text-xs md:text-sm uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              &copy; 2026 Radiant Skincare &middot; Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
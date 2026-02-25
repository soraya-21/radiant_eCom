import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await api.post('auth/login/', {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      setUser({ loggedIn: true });

      navigate('/');
    } catch (err) {
      console.error("Erreur connexion:", err.response?.data);
      setError("Email ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-slate-950 to-slate-900' : 'bg-gradient-to-br from-gray-50 to-white'} flex items-center justify-center px-4 py-12`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-serif mb-2 tracking-wider ${isDark ? 'text-white' : 'text-gray-950'}`}>Radiant</h1>
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-8 h-px bg-gold-500"></div>
            <div className="w-2 h-px bg-rose-500"></div>
            <div className="w-8 h-px bg-gold-500"></div>
          </div>
          <h2 className={`text-2xl font-serif mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>Connexion</h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>Accédez à votre compte Radiant</p>
        </div>

        {error && (
          <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-red-900/30 border border-red-500/50 text-red-200' : 'bg-red-100 border border-red-300 text-red-800'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 border ${isDark ? 'border-gold-500/20' : 'border-gold-200'}`}>
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${isDark ? 'bg-slate-700 border-gold-500/30 text-white placeholder-gray-400 focus:border-gold-400' : 'bg-gray-50 border-gold-300 text-gray-950 placeholder-gray-500 focus:border-gold-600'}`}
              placeholder="votre@email.com"
            />
          </div>

          <div className="mb-8">
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${isDark ? 'bg-slate-700 border-gold-500/30 text-white placeholder-gray-400 focus:border-gold-400' : 'bg-gray-50 border-gold-300 text-gray-950 placeholder-gray-500 focus:border-gold-600'}`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold uppercase tracking-widest transition ${isDark ? 'bg-gold-500 hover:bg-gold-600 text-white disabled:opacity-50' : 'bg-gold-600 hover:bg-gold-700 text-white disabled:opacity-50'}`}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className={`text-center mt-6 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          Vous n'avez pas de compte ?{' '}
          <Link to="/register" className={`font-semibold ${isDark ? 'text-gold-400 hover:text-gold-300' : 'text-gold-700 hover:text-gold-800'} transition`}>
            S'inscrire
          </Link>
        </p>

        <p className={`text-center mt-4 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          <Link to="/shop" className={`font-semibold ${isDark ? 'text-gold-400 hover:text-gold-300' : 'text-gold-700 hover:text-gold-800'} transition`}>
            Continuer vers la boutique
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
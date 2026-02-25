import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setUser } = useContext(AuthContext);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-white mb-2 tracking-wider">Radiant</h1>
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-8 h-px bg-gold-500"></div>
            <div className="w-2 h-px bg-rose-500"></div>
            <div className="w-8 h-px bg-gold-500"></div>
          </div>
          <h2 className="text-2xl font-serif text-white mb-2">Connexion</h2>
          <p className="text-gray-400">Accédez à votre compte Radiant</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-rose-500/20 border border-rose-500/50 text-rose-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800/50 border border-gold-500/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800/50 border border-gold-500/30 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-gold-500 to-rose-500 text-white py-3 font-bold rounded-lg hover:shadow-2xl hover:shadow-gold-500/50 transition transform hover:scale-105 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connexion en cours...' : 'Entrer dans l\'univers'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Pas encore de compte ?
          </p>
          <Link
            to="/register"
            className="text-gold-400 hover:text-gold-300 font-semibold transition"
          >
            Créer un compte
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="text-gray-400 hover:text-gray-300 text-sm transition inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continuer vos achats
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
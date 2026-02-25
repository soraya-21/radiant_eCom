import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useTheme } from '../context/ThemeContext';

const Register = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ first_name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setIsLoading(true);

    try {
      await api.post('accounts/register/', {
        first_name: formData.first_name,
        email: formData.email,
        password: formData.password
      });

      navigate('/login');
    } catch (err) {
      console.error("Erreur inscription:", err.response?.data);
      setError(err.response?.data?.email?.[0] || "Erreur lors de l'inscription");
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
          <h2 className={`text-2xl font-serif mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>Créer un compte</h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-700'}>Rejoignez Radiant dès aujourd'hui</p>
        </div>

        {error && (
          <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-red-900/30 border border-red-500/50 text-red-200' : 'bg-red-100 border border-red-300 text-red-800'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 border ${isDark ? 'border-gold-500/20' : 'border-gold-200'}`}>
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>
              Nom
            </label>
            <input
              type="text"
              required
              value={formData.first_name}
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${isDark ? 'bg-slate-700 border-gold-500/30 text-white placeholder-gray-400 focus:border-gold-400' : 'bg-gray-50 border-gold-300 text-gray-950 placeholder-gray-500 focus:border-gold-600'}`}
              placeholder="Jean Dupont"
            />
          </div>

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
              placeholder="Minimum 8 caractères"
            />
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Minimum 8 caractères
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold uppercase tracking-widest transition ${isDark ? 'bg-gold-500 hover:bg-gold-600 text-white disabled:opacity-50' : 'bg-gold-600 hover:bg-gold-700 text-white disabled:opacity-50'}`}
          >
            {isLoading ? 'Création...' : 'Créer un compte'}
          </button>
        </form>

        <p className={`text-center mt-6 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className={`font-semibold ${isDark ? 'text-gold-400 hover:text-gold-300' : 'text-gold-700 hover:text-gold-800'} transition`}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
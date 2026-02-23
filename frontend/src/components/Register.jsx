import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', first_name: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
        ...formData,
        username: formData.email
    };

    try {
        const res = await api.post('/accounts/register/', dataToSend);
        alert("Compte Radiant Skincare créé avec succès !");
        navigate('/login');
    } catch (err) {
        console.error("Détails 400:", err.response.data);
        alert("Erreur : " + JSON.stringify(err.response.data));
    }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-xl border border-gray-100">
        <h2 className="text-center text-3xl font-serif tracking-widest uppercase text-indigo-900">Rejoindre Radiant Skincare</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Prénom"
            className="w-full p-3 border-b border-gray-300 focus:border-indigo-600 outline-none transition"
            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border-b border-gray-300 focus:border-indigo-600 outline-none transition"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 border-b border-gray-300 focus:border-indigo-600 outline-none transition"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit" className="w-full bg-indigo-900 text-white py-3 uppercase tracking-widest hover:bg-indigo-700 transition">
            Créer mon compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
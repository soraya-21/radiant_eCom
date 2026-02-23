import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { setUser } = useContext(AuthContext); 
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('auth/login/', { 
                email: formData.email, 
                password: formData.password 
            });

            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            
            setUser({ loggedIn: true }); 
            
            console.log("Connexion réussie !");
            navigate('/');
        } catch (err) {
            console.error("Détails du refus :", err.response?.data);
            alert("Erreur : " + JSON.stringify(err.response?.data));
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-xl border border-gray-100">
        <h2 className="text-center text-3xl font-serif tracking-widest uppercase text-indigo-900">Connexion</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
            Entrer dans l'univers
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
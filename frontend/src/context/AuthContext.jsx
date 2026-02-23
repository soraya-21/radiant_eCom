import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Optionnel : Tu pourrais faire un appel API ici pour recup les infos user
            setUser({ loggedIn: true }); 
        }
        setLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
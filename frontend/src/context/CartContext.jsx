import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api'; // <--- ASSURE-TOI QUE CE CHEMIN EST CORRECT

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('radiant_cart');
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('radiant_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchRemoteCart = async () => {
      if (localStorage.getItem('access_token') && cartItems.length === 0) {
        try {
          const res = await api.get('orders/get-cart/');
          if (res.data?.cart?.length > 0) {
            setCartItems(res.data.cart);
          }
        } catch (err) {
          console.error("Erreur récup Redis:", err);
        }
      }
    };
    fetchRemoteCart();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      clearCart();
      // Nettoie l'URL pour éviter de vider le panier en boucle si on rafraîchit
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === productId);
      
      if (!existing) return prevItems;

      if (existing.quantity <= 1) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('radiant_cart');
  };

  const getCartCount = () => cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
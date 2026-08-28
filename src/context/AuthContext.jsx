import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to load user:', error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { 
      email: email.trim(), 
      password: password.trim() 
    });
    const { token: newToken, ...userData } = res.data;
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const register = async (name, email, password, role) => {
    const res = await api.post('/auth/register', { 
      name, 
      email: email.trim(), 
      password: password.trim(), 
      role 
    });
    const { token: newToken, ...userData } = res.data;
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Backend API update method
  const updateUser = async (newData) => {
    if (!user) return;
    
    // Optimistic UI update
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    
    try {
      // Send changes to DB
      await api.put('/users/profile', newData);
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Revert if needed, but keeping it simple for now
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

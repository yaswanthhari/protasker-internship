import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL
  const API_URL = 'http://localhost:5000/api/auth';

  useEffect(() => {
    // Check if user is logged in on load
    const storedUser = localStorage.getItem('protasker_user');
    const token = localStorage.getItem('protasker_token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${API_URL}/register`, { name, email, password });
      
      const { token, user: userData } = res.data;
      
      localStorage.setItem('protasker_token', token);
      localStorage.setItem('protasker_user', JSON.stringify(userData));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${API_URL}/login`, { email, password });
      
      const { token, user: userData } = res.data;
      
      localStorage.setItem('protasker_token', token);
      localStorage.setItem('protasker_user', JSON.stringify(userData));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('protasker_token');
    localStorage.removeItem('protasker_user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

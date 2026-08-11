import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = '/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('scrapify_token'));

  // Set axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user on mount
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`);
      setUser(res.data.data);
    } catch (error) {
      console.error('Load user error:', error);
      localStorage.removeItem('scrapify_token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    const res = await axios.post(`${API_URL}/auth/register`, userData);
    const { token: newToken, ...userInfo } = res.data.data;
    localStorage.setItem('scrapify_token', newToken);
    setToken(newToken);
    setUser(userInfo);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token: newToken, ...userInfo } = res.data.data;
    localStorage.setItem('scrapify_token', newToken);
    setToken(newToken);
    setUser(userInfo);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('scrapify_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (data) => {
    const res = await axios.put(`${API_URL}/auth/profile`, data);
    setUser(res.data.data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, register, login, logout, updateProfile, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

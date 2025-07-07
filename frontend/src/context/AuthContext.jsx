import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUserProfile();
      setUser(res.data);
    } catch (err) {
      console.error('🔴 AuthContext: Failed to load user', err);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = ({ access, refresh }) => {
    // Save tokens to state and localStorage
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    fetchUserProfile();
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [fetchUserProfile]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, accessToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

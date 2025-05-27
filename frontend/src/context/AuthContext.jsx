import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
    setIsAuthChecked(true);
  }, []);

  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveRegisteredUsers = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const login = async (email, password) => {
    try {
      const registeredUsers = getRegisteredUsers();
      const foundUser = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const dummyResponse = {
          success: true,
          token: 'dummy-jwt-token-123',
          user: { id: foundUser.id, name: foundUser.name, email: foundUser.email },
        };

        setIsLoggedIn(true);
        setUser(dummyResponse.user);
        localStorage.setItem('authToken', dummyResponse.token);
        localStorage.setItem('userData', JSON.stringify(dummyResponse.user));
        navigate('/dashboard');
        return { success: true };
      } else {
        return { success: false, message: 'Email atau password salah.' };
      }
    } catch (error) {
      return { success: false, message: 'Terjadi kesalahan saat login.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const registeredUsers = getRegisteredUsers();

      if (registeredUsers.some((u) => u.email === email)) {
        return { success: false, message: 'Email sudah terdaftar. Silakan login.' };
      }

      const newUserId = registeredUsers.length > 0 ? Math.max(...registeredUsers.map(u => u.id)) + 1 : 1;
      const newUser = { id: newUserId, name, email, password };
      registeredUsers.push(newUser);
      saveRegisteredUsers(registeredUsers);

      return { success: true, message: 'Registrasi berhasil! Silakan login.' };
    } catch (error) {
      return { success: false, message: 'Terjadi kesalahan saat registrasi.' };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout, api, isAuthChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
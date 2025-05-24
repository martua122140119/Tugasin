// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import API_BASE_URL from '../config'; // Import base URL API

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Konfigurasi instance Axios untuk kemudahan, tambahkan header Authorize nanti
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor untuk menambahkan token ke setiap request jika ada
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
  }, []);

  // Fungsi untuk proses Login (terhubung ke backend)
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password }); // Endpoint login backend

      // Asumsi backend mengembalikan { token: "...", user: { id: ..., name: ..., email: ... } }
      const { token, user } = response.data;

      setIsLoggedIn(true);
      setUser(user);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));

      navigate('/dashboard'); // Arahkan ke dashboard setelah login
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : 'Email atau password salah.'; // Pesan default jika error tidak spesifik
      return { success: false, message: errorMessage };
    }
  };

  // Fungsi untuk proses Register (terhubung ke backend)
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password }); // Endpoint register backend

      // Asumsi backend mengembalikan { message: "...", user: { ... } } atau hanya { message: "..." }
      console.log('Register success:', response.data);

      navigate('/login'); // Setelah register, biasanya pengguna diarahkan ke halaman login
      return { success: true, message: response.data.message || 'Registrasi berhasil!' };
    } catch (error) {
      console.error('Register error:', error.response ? error.response.data : error.message);
      const errorMessage = error.response && error.response.data && error.response.data.message
                           ? error.response.data.message
                           : 'Registrasi gagal. Email mungkin sudah terdaftar.'; // Pesan default jika error tidak spesifik
      return { success: false, message: errorMessage };
    }
  };

  // Fungsi untuk proses Logout
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout, api }}> {/* Tambahkan 'api' di value */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Buat Context baru
export const ThemeContext = createContext();

// Buat provider untuk membungkus komponen yang membutuhkan tema
export const ThemeProvider = ({ children }) => {
  // Ambil tema dari localStorage, atau default ke 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'light';
  });

  // Efek samping untuk menyimpan tema ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    // Tambahkan class ke body untuk styling CSS
    document.body.className = theme;
  }, [theme]);

  // Fungsi untuk mengubah tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook kustom untuk memudahkan penggunaan tema
export const useTheme = () => {
  return useContext(ThemeContext);
};
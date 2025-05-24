// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth(); // Dapatkan status login

  if (!isLoggedIn) {
    // Jika belum login, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  return children; // Jika sudah login, render children (komponen halaman)
}

export default PrivateRoute;
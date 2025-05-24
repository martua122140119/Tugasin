// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { BsMoon, BsSun } from 'react-icons/bs';

import HomePage from './pages/HomePage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import DashboardPage from './pages/DashboardPage';
import ManageMatkulPage from './pages/ManageMatkulPage.jsx';
import TaskFormPage from './pages/TaskFormPage';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import logoImage from './logo.png'; // Pastikan path logo ini benar

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="App d-flex flex-column min-vh-100">
            <AppNavbar /> {/* Gunakan komponen AppNavbar */}

            <div className="container mt-4 flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginRegisterPage />} />
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/manage-courses" element={<PrivateRoute><ManageMatkulPage /></PrivateRoute>} />
                <Route path="/task-form" element={<PrivateRoute><TaskFormPage /></PrivateRoute>} />
                <Route path="/task-form/:id" element={<PrivateRoute><TaskFormPage /></PrivateRoute>} />
              </Routes>
            </div>

            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

// ==============================================================================
// KOMPONEN AppNavbar (DI DALAM FILE YANG SAMA)
// ==============================================================================
function AppNavbar() {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth(); // Ambil juga objek 'user' dari useAuth()

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'light' ? 'navbar-dark bg-dark' : 'navbar-dark bg-secondary'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logoImage}
            alt="Logo Sistem Tracking Tugas Kuliah"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          Sistem Tracking Tugas Kuliah
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage-courses">Mata Kuliah</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {isLoggedIn ? ( // Tampilkan nama user dan tombol Logout jika sudah login
              <>
                {user && ( // Pastikan objek user ada sebelum mencoba mengakses user.name
                  <span className="navbar-text me-3 text-light"> {/* text-light untuk visibilitas di navbar dark */}
                    Halo, {user.name}!
                  </span>
                )}
                <button className="btn btn-outline-light me-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : ( // Tampilkan link Login jika belum login
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>
            )}
            <button
              className={`btn ${theme === 'light' ? 'btn-light' : 'btn-dark'}`}
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <BsMoon size={20} />
              ) : (
                <BsSun size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default App;
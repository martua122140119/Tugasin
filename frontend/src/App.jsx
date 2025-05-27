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

import logoImage from './logo.png';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="App d-flex flex-column min-vh-100">
            <AppNavbar />

            <AppContentWithAuthCheck />

            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

// ==============================================================================
// KOMPONEN AppNavbar
// ==============================================================================
function AppNavbar() {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth(); // Ambil isLoggedIn dari useAuth()

  // Tentukan path untuk link brand secara kondisional
  const brandLinkPath = isLoggedIn ? "/dashboard" : "/";

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
      <div className="container-fluid">
        
        <Link className="navbar-brand d-flex align-items-center" to={brandLinkPath}>
          <img
            src={logoImage}
            alt="Logo Sistem Tracking Tugas Kuliah"
            width="30"
            height="45"
            className="d-inline-block align-text-top me-2"
          />
          Tugasin
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
            {isLoggedIn ? (
              <>
                {user && (
                  <span className="navbar-text me-3 text-white">
                    Halo, {user.name}!
                  </span>
                )}
                <button className="btn btn-outline-light me-2" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
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

// ==============================================================================
// KOMPONEN AppContentWithAuthCheck (Tidak berubah)
// ==============================================================================
function AppContentWithAuthCheck() {
  const { isAuthChecked } = useAuth();

  if (!isAuthChecked) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Memuat sesi...</p>
      </div>
    );
  }

  return (
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
  );
}

export default App;
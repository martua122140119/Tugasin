import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ManageMatkulPage from './pages/ManageMatkulPage.jsx';
import PrivateRoute from './PrivateRoute.jsx'; // Import PrivateRoute
// import Navbar from './components/Navbar.jsx'; // Jika kamu punya komponen Navbar

function App() {
  return (
    <Router>
      {/* <Navbar /> */} {/* Tambahkan Navbar di sini jika digunakan */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/matkul" element={<PrivateRoute><ManageMatkulPage /></PrivateRoute>} />
        <Route path="/" element={<LoginPage />} /> {/* Change root to LoginPage */}
      </Routes>
    </Router>
  );
}

export default App;
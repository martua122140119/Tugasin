// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');
    // **DEMO LOGIN LOGIC:**
    if (email === 'demo@example.com' && password === 'demo123') {
      // Simulasi login berhasil
      login({ id: 'demo-user', nama: 'Demo User', email: 'demo@example.com' });
      navigate('/dashboard');
    } else if (email === '' || password === '') {
      setError('Email dan password harus diisi.');
    } else {
      setError('Login gagal. Email atau password salah.');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
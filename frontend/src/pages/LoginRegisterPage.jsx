import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginRegisterPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { login, register } = useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await login(loginEmail, loginPassword);
    if (!result.success) {
      showMessage(result.message || 'Login gagal. Coba lagi.', 'danger');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const result = await register(registerName, registerEmail, registerPassword);
    if (!result.success) {
      showMessage(result.message || 'Registrasi gagal. Coba lagi.', 'danger');
    } else {
        showMessage(result.message || 'Registrasi berhasil! Silakan login.', 'success');
        setIsLoginMode(true);
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPassword('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3>{isLoginMode ? 'Login' : 'Register'} Akun</h3>
            </div>
            <div className="card-body p-4">

              {message && (
                <div className={`alert alert-${messageType}`} role="alert">
                  {message}
                </div>
              )}

              {isLoginMode ? (
                // Form Login
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      placeholder="name@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success btn-lg">Login</button>
                    <button
                      type="button"
                      className="btn btn-link mt-2 text-decoration-none"
                      onClick={() => {
                        setIsLoginMode(false);
                        setLoginEmail('');
                        setLoginPassword('');
                        setMessage('');
                        setMessageType('');
                      }}
                    >
                      Belum punya akun? Register di sini
                    </button>
                  </div>
                </form>
              ) : (
                // Form Register
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">Nama Lengkap</label>
                    <input
                      type="text"
                      className="form-control"
                      id="registerName"
                      placeholder="Nama Lengkap Anda"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="registerEmail"
                      placeholder="name@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="registerPassword"
                      placeholder="Minimal 6 karakter"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                    <button
                      type="button"
                      className="btn btn-link mt-2 text-decoration-none"
                      onClick={() => {
                        setIsLoginMode(true);
                        setRegisterName('');
                        setRegisterEmail('');
                        setRegisterPassword('');
                        setMessage('');
                        setMessageType('');
                      }}
                    >
                      Sudah punya akun? Login di sini
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegisterPage;
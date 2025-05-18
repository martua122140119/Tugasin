import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Footer from '../components/Footer.jsx';
import logo from '../logo.png'; 

function HomePage() {
  return (
    <div className="home-page">
      <div className="container">
        <main className="home-main-content">
          <section className="hero">
            <div className="hero-content">
              <h1>Selamat Datang di Tugasin!</h1>
              <p className="tagline">Solusi Terbaik untuk Mengelola Tugas dan Proyek Kuliahmu! !</p>
              <div className="hero-buttons">
                <Link to="/login" className="button primary">Login</Link>
                <Link to="/register" className="button secondary">Daftar</Link>
              </div>
            </div>
            <div className="hero-image">
              <img src={logo} alt="Logo Tugasin" />
            </div>
          </section>

          <section className="features">
            <h2>Fitur Utama</h2>
            <div className="features-grid">
              <div className="feature-item">
                <i className="fas fa-tasks"></i>
                <h3>Organisasi Tugas</h3>
                <p>Kelola semua tugas dan proyek kuliah dalam satu platform terpusat.</p>
              </div>
              <div className="feature-item">
                <i className="far fa-calendar-alt"></i>
                <h3>Pengingat Deadline</h3>
                <p>Jangan lewatkan tenggat waktu penting dengan sistem pengingat yang efektif.</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-filter"></i>
                <h3>Filter & Sortir</h3>
                <p>Temukan tugas dengan cepat berdasarkan mata kuliah, tenggat waktu, atau status.</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-mobile-alt"></i>
                <h3>Akses Multi-Perangkat</h3>
                <p>Akses Tugasin kapan saja, di mana saja, melalui perangkat desktop dan mobile.</p>
              </div>
            </div>
          </section>

          <section className="call-to-action">
            <h2>Siap untuk Lebih Terorganisir?</h2>
            <p>Bergabunglah dengan Tugasin sekarang dan rasakan kemudahan disetiap fiturnya</p>
            <Link to="/register" className="button call-to-action-button">Daftar Sekarang</Link>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
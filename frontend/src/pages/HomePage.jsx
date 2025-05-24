// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

function HomePage() {
  const { theme } = useTheme(); // Dapatkan tema aktif

  // Tentukan kelas background dan text berdasarkan tema
  const jumbotronBgClass = theme === 'light' ? 'bg-light' : 'bg-dark'; // Ubah dari 'bg-light'
  const jumbotronTextClass = theme === 'light' ? 'text-dark' : 'text-light'; // Pastikan teks juga berubah

  return (
    <div className="container mt-5 text-center">
      {/* Gunakan kelas dinamis untuk background dan teks */}
      <div className={`p-5 mb-4 rounded-3 shadow ${jumbotronBgClass} ${jumbotronTextClass}`}>
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Sistem Tracking Tugas & Proyek Kuliah</h1>
          <p className="col-md-8 fs-4 mx-auto">
            Kelola semua tugas dan proyek kuliah Anda dengan mudah dan terorganisir.
            Hindari keterlambatan pengumpulan dengan sistem yang terintegrasi penuh.
          </p>
          <hr className="my-4" />
          <h3 className="mb-3">Fitur Unggulan:</h3>
          <ul className="list-unstyled mb-4">
            {/* Pastikan ikon juga responsif atau setidaknya terlihat */}
            <li><i className={`bi bi-check-circle-fill ${theme === 'light' ? 'text-success' : 'text-info'} me-2`}></i> Pencatatan & Pengelolaan Tugas</li>
            <li><i className={`bi bi-check-circle-fill ${theme === 'light' ? 'text-success' : 'text-info'} me-2`}></i> Pengorganisasian Mata Kuliah</li>
            <li><i className={`bi bi-check-circle-fill ${theme === 'light' ? 'text-success' : 'text-info'} me-2`}></i> Filter & Sortir Berdasarkan Deadline/Status</li>
            <li><i className={`bi bi-check-circle-fill ${theme === 'light' ? 'text-success' : 'text-info'} me-2`}></i> Autentikasi Pengguna Aman</li>
            <li><i className={`bi bi-check-circle-fill ${theme === 'light' ? 'text-success' : 'text-info'} me-2`}></i> Desain Responsif untuk Berbagai Perangkat</li>
          </ul>
          <Link className="btn btn-primary btn-lg me-2" to="/dashboard" role="button">
            Lihat Dashboard (Demo)
          </Link>
          <Link className="btn btn-outline-success btn-lg" to="/login" role="button"> {/* Arahkan ke /login */}
            Login / Register
          </Link>
        </div>
      </div>
      {/* Opsional: Bagian testimonial atau screenshot */}
      <div className="row mt-5">
        <div className="col-md-6 mx-auto">
          {/* Pastikan teks testimonial juga responsif */}
          <h4 className={`${jumbotronTextClass}`}>"Aplikasi ini benar-benar mengubah cara saya mengatur tugas kuliah!"</h4>
          <p className="text-muted">- Seorang Mahasiswa Produktif</p> {/* text-muted mungkin perlu disesuaikan jika terlalu gelap di dark mode */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
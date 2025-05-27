import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Untuk menyesuaikan warna footer dengan tema

function Footer() {
  const { theme } = useTheme(); // Dapatkan tema aktif

  return (
    <footer className={`py-3 mt-5 ${theme === 'light' ? 'bg-dark text-white' : 'bg-secondary text-white-50'}`}>
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Sistem Tracking Tugas dan Proyek Kuliah. Hak Cipta Dilindungi.
        </p>
        <p className="mb-0">Dibuat dengan ❤️ untuk Tugas Besar Pemrograman Web.</p>
      </div>
    </footer>
  );
}

export default Footer;
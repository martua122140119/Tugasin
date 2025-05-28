# Sistem Tracking Tugas dan Proyek Kuliah - Aplikasi Manajemen Tugas Mahasiswa

## Deskripsi Aplikasi Web

Aplikasi web ini dirancang untuk membantu mahasiswa mengelola dan memantau semua tugas serta proyek perkuliahan secara terorganisir dan efisien. Dengan antarmuka yang intuitif, mahasiswa dapat mencatat, mengedit, dan menyaring tugas berdasarkan tenggat waktu atau mata kuliah. Fitur autentikasi pengguna memastikan data pribadi tetap aman, sementara fitur *reminder* membantu menghindari keterlambatan pengumpulan. Aplikasi ini bertujuan untuk meningkatkan produktivitas dan mengurangi beban manajemen tugas bagi mahasiswa, dibangun sebagai tugas mata kuliah Pemrograman Web.

## Link Repositori GitHub

- **Frontend (React JS):** (https://github.com/martua122140119/Tugasin.git)
- **Backend (Python/Pyramid):** (https://github.com/martua122140119/Tugasin.git)

## Struktur Proyek

### Front-end (React)

```plaintext
├── node_modules/                      # Dependencies Node.js
├── public/                            
│   ├── index.html                     # Halaman HTML utama React
│   └── logo-tugas-kuliah.png          # File gambar logo
├── src/                               
│   ├── components/                    
│   │   ├── TaskCard.jsx               # Menampilkan kartu tugas
│   │   ├── Footer.js                  # Komponen Footer aplikasi
│   │   └── PrivateRoute.js            # Melindungi rute
│   ├── context/                        
│   │   ├── AuthContext.js             # Autentikasi pengguna
│   │   └── ThemeContext.js            # Tema gelap/terang
│   ├── pages/                          
│   │   ├── DashboardPage.js           # Halaman Dashboard utama
│   │   ├── HomePage.js                # Halaman beranda 
│   │   ├── LoginRegisterPage.js       # Halaman login&registrasi
│   │   ├── ManageMatkulPage.jsx       # Halaman CRUD Mata Kuliah
│   │   └── TaskFormPage.js            # Halaman tambah/edit tugas
│   ├── App.jsx                        # Komponen utama 
│   ├── config.js                      # File konfigurasi 
│   ├── index.css                      # Global CSS 
│   ├── index.js                       # Titik masuk utama aplikasi
│   └── logo.png                       # Logo aplikasi
├── .gitignore                         # File yang diabaikan Git
├── package.json                       # dependencies
├── package-lock.json                  # Lock file dependencies
└── README.md                          # Dokumentasi frontend
```

### Back-end (Python Pyramid)

```plaintext
backend/
├── venv/                            # Virtual Environment Python
├── tugasin_api/                     
│   ├── __init__.py                  # Inisialisasi & konfigurasi Pyramid
│   ├── models.py                    # Definisi model database
│   ├── views.py                     # Endpoint API (Cornice)
│   ├── security.py                  # Logika keamanan (ACL)
│   ├── scripts/                     # Folder script utilitas
│   │   └── initializedb.py          # Script inisialisasi database
│   └── tests.py                     # Unit tests
├── development.ini                  # Konfigurasi pengembangan
├── production.ini                   # Konfigurasi produksi
├── requirements.txt                 # Dependensi Python
├── runapp.py                        # Script memulai aplikasi
├── setup.py                         # Script instalasi package
└── .gitignore                       # File yang diabaikan Git
```

## Teknologi & Dependensi Utama

### Front-end (React)

**Teknologi Inti:**
- **React JS:** Pustaka JavaScript untuk membangun antarmuka pengguna.
- **React Router DOM:** Untuk manajemen navigasi dan *routing* di sisi klien.
- **Context API:** Untuk manajemen *state* global (Autentikasi, Tema).
- **Axios:** Klien HTTP untuk komunikasi dengan API *backend*.
- **Bootstrap CSS:** Framework CSS untuk *styling* responsif.

**Dependencies Paket (via `package.json`):**
```json
{
    "dependencies": {
        "@testing-library/dom": "^10.4.0",
        "@testing-library/jest-dom": "^6.6.3",
        "@testing-library/react": "^16.3.0",
        "@testing-library/user-event": "^13.5.0",
        "axios": "^1.9.0",
        "bootstrap": "^5.3.6",
        "bootstrap-icons": "^1.13.1",
        "react": "^19.1.0",
        "react-dom": "^19.1.0",
        "react-icons": "^5.5.0",
        "react-router-dom": "^7.6.0",
        "react-scripts": "5.0.1",
        "web-vitals": "^2.1.4"
    }
}
```
Untuk menginstal: `npm install` (atau `yarn install`) di direktori `frontend/`.

### Back-end (Python Pyramid)

**Teknologi Inti:**
- **Python 3.12:** Bahasa pemrograman utama.
- **Pyramid Framework:** Framework web untuk membangun RESTful API.
- **PostgreSQL:** Sistem manajemen basis data relasional.
- **SQLAlchemy:** ORM (Object-Relational Mapper) untuk interaksi database.
- **JWT (JSON Web Token):** Untuk autentikasi berbasis token.

**Dependencies Paket (via `requirements.txt`):**
```
pyramid
sqlalchemy
psycopg2-binary
pyramid_jwt
cornice
pyramid_debugtoolbar
waitress
gunicorn
passlib
zope.sqlalchemy
```
Untuk menginstal (setelah aktivasi venv): `pip install -r requirements.txt` di direktori `backend/`.

## Fitur Aplikasi

Aplikasi ini memiliki fitur-fitur inti berikut:

1. **Autentikasi Pengguna:** Sistem pendaftaran (Register) dan masuk (Login) yang aman untuk setiap mahasiswa.
2. **Proteksi Rute:** Halaman Dashboard dan manajemen data hanya dapat diakses oleh pengguna yang sudah terautentikasi.
3. **CRUD Mata Kuliah:** Pengguna dapat menambah, melihat, mengedit, dan menghapus mata kuliah yang diambil.
4. **CRUD Tugas/Proyek:** Pengguna dapat menambah, melihat detail, mengedit, dan menghapus tugas atau proyek untuk setiap mata kuliah.
5. **Filter Tugas Dinamis:** Tugas dapat disaring berdasarkan status (Selesai/Belum Selesai) dan tenggat waktu (deadline).
6. **Dashboard Tugas Aktif:** Tampilan ringkasan tugas-tugas yang mendekati tenggat waktu atau belum selesai.
7. **Tampilan Responsif:** Antarmuka aplikasi adaptif untuk berbagai ukuran layar (desktop, tablet, mobile).
8. **Mode Gelap & Terang:** Pilihan tema visual yang dapat disesuaikan pengguna, dengan pengaturan yang tersimpan.
9. **Data Spesifik Pengguna:** Setiap pengguna hanya dapat melihat dan mengelola data mata kuliah dan tugasnya sendiri (setelah terintegrasi dengan backend).

## Cara Menjalankan Aplikasi

### Menjalankan Back-end (Pyramid)

1. Pastikan PostgreSQL server Anda berjalan.
2. Buat database PostgreSQL baru dan atur user/password sesuai konfigurasi di `development.ini`.
3. Di terminal, navigasi ke direktori `backend/`.
4. Aktifkan virtual environment:
   - **Windows:** `.\venv\Scripts\activate`
   - **Linux/macOS:** `source venv/bin/activate`
5. Instal proyek backend dalam mode editable:
   ```bash
   pip install -e .
   ```
6. Inisialisasi database (membuat tabel dan data dummy awal):
   ```bash
   initialize_db development.ini
   ```
7. Jalankan server backend:
   ```bash
   pserve development.ini
   ```
   Server akan berjalan di `http://localhost:6543`.

### Menjalankan Front-end (React)

1. Di terminal baru, navigasi ke direktori `frontend/`.
2. Install dependensi (jika belum):
   ```bash
   npm install
   ```
3. Jalankan aplikasi React:
   ```bash
   npm start
   ```
   Aplikasi akan terbuka di `http://localhost:3000` di browser Anda.

## Referensi

Proyek ini dibangun menggunakan teknologi dan pustaka berikut, dengan referensi utama dari dokumentasi resmi mereka:

- **Python:** [Python Documentation](https://www.python.org/doc/)
- **Pyramid Framework:** [Pyramid Documentation](https://docs.pylonsproject.org/projects/pyramid/en/latest/)
- **SQLAlchemy:** [SQLAlchemy Documentation](https://docs.sqlalchemy.org/en/latest/)
- **PostgreSQL:** [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- **pyramid_jwt:** [pyramid_jwt GitHub](https://github.com/wichert/pyramid_jwt) atau [PyPI](https://pypi.org/project/pyramid-jwt/)
- **Cornice:** [Cornice Documentation](https://cornice.readthedocs.io/en/latest/)
- **Passlib:** [Passlib Documentation](https://passlib.readthedocs.io/en/stable/)
- **Zope.sqlalchemy:** [Zope.sqlalchemy PyPI](https://pypi.org/project/zope.sqlalchemy/)
- **React JS:** [React Documentation](https://react.dev/)
- **React Router DOM:** [React Router Documentation](https://reactrouter.com/en/main)
- **Axios:** [Axios Documentation](https://axios-http.com/docs/)
- **Bootstrap:** [Bootstrap Documentation](https://getbootstrap.com/docs/)
- **React Icons:** [React Icons Documentation](https://react-icons.github.io/react-icons/)
- **Bootstrap Icons:** [Bootstrap Icons Documentation](https://icons.getbootstrap.com/)
- **Google Fonts (Poppins):** [Google Fonts](https://fonts.google.com/specimen/Poppins)

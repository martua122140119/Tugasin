// src/pages/TaskFormPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskFormPage() {
  const { id } = useParams(); // Mengambil ID dari URL jika dalam mode edit
  const navigate = useNavigate(); // Untuk navigasi setelah submit

  // State untuk data form tugas
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [deadline, setDeadline] = useState('');
  const [matkulId, setMatkulId] = useState(''); // Akan menyimpan ID mata kuliah
  const [status, setStatus] = useState('Belum Selesai');

  // Data dummy mata kuliah untuk dropdown (akan diganti dengan data dari API nanti)
  const dummyMatkuls = [
    { id: 1, nama_matkul: 'Pemrograman Web' },
    { id: 2, nama_matkul: 'Basis Data' },
    { id: 3, nama_matkul: 'Metodologi Penelitian' },
    { id: 4, nama_matkul: 'Kecerdasan Buatan' },
  ];

  // Data dummy tugas (digunakan jika dalam mode edit, harusnya dari API)
  const dummyTasks = [
    { id: 1, judul: 'Membuat Desain UI/UX', deskripsi: 'Desain wireframe untuk aplikasi web.', deadline: '2025-06-01', status: 'Belum Selesai', matkul_id: 1 },
    { id: 2, judul: 'Belajar React Hooks', deskripsi: 'Pahami useState, useEffect, useContext.', deadline: '2025-05-28', status: 'Belum Selesai', matkul_id: 1 },
    { id: 3, judul: 'Presentasi Basis Data', deskripsi: 'Siapkan slide presentasi materi normalisasi database.', deadline: '2025-06-05', status: 'Belum Selesai', matkul_id: 2 },
  ];

  // Efek untuk mengisi form jika dalam mode edit
  useEffect(() => {
    if (id) { // Jika ada ID di URL, berarti mode edit
      const taskToEdit = dummyTasks.find(task => task.id === parseInt(id));
      if (taskToEdit) {
        setJudul(taskToEdit.judul);
        setDeskripsi(taskToEdit.deskripsi);
        setDeadline(taskToEdit.deadline);
        setMatkulId(taskToEdit.matkul_id.toString()); // Convert to string for select input
        setStatus(taskToEdit.status);
      } else {
        // Jika ID tidak ditemukan, mungkin navigasi kembali atau tampilkan error
        console.warn('Tugas tidak ditemukan!');
        navigate('/dashboard'); // Kembali ke dashboard
      }
    }
  }, [id, navigate, dummyTasks]); // Tambahkan dummyTasks ke dependency array

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      judul,
      deskripsi,
      deadline,
      matkul_id: parseInt(matkulId),
      status
    };

    if (id) {
      // Logika untuk EDIT tugas
      console.log('Update Tugas:', { id: parseInt(id), ...taskData });
      // TODO: Nanti akan ada fetch API untuk update tugas
    } else {
      // Logika untuk TAMBAH tugas baru
      console.log('Tambah Tugas Baru:', taskData);
      // TODO: Nanti akan ada fetch API untuk tambah tugas
    }

    navigate('/dashboard'); // Kembali ke dashboard setelah submit
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{id ? 'Edit Tugas' : 'Tambah Tugas Baru'}</h2>

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h5>Detail Tugas</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="judul" className="form-label">Judul Tugas</label>
              <input
                type="text"
                className="form-control"
                id="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Membuat laporan akhir"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
              <textarea
                className="form-control"
                id="deskripsi"
                rows="3"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsi singkat tentang tugas..."
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">Deadline</label>
              <input
                type="date"
                className="form-control"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="matkul" className="form-label">Mata Kuliah</label>
              <select
                className="form-select"
                id="matkul"
                value={matkulId}
                onChange={(e) => setMatkulId(e.target.value)}
                required
              >
                <option value="">Pilih Mata Kuliah</option>
                {dummyMatkuls.map(matkul => (
                  <option key={matkul.id} value={matkul.id}>{matkul.nama_matkul}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Belum Selesai">Belum Selesai</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success btn-lg">
                {id ? 'Simpan Perubahan' : 'Tambah Tugas'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                onClick={() => navigate('/dashboard')}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskFormPage;
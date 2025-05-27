import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard.jsx';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  // Data tugas: Muat dari localStorage, atau gunakan dummy jika kosong
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks'); // Gunakan key 'tasks'
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, judul: 'Membuat Desain UI/UX', deskripsi: 'Desain wireframe untuk aplikasi web.', deadline: '2025-06-01', status: 'Belum Selesai', matkul: 'Pemrograman Web', matkul_id: 1 },
      { id: 2, judul: 'Belajar React Hooks', deskripsi: 'Pahami useState, useEffect, useContext.', deadline: '2025-05-28', status: 'Belum Selesai', matkul: 'Pemrograman Web', matkul_id: 1 },
      { id: 3, judul: 'Presentasi Basis Data', deskripsi: 'Siapkan slide presentasi materi normalisasi database.', deadline: '2025-06-05', status: 'Belum Selesai', matkul: 'Basis Data', matkul_id: 2 },
      { id: 4, judul: 'Revisi Laporan Akhir', deskripsi: 'Perbaiki bab 1 dan 2 berdasarkan masukan dosen.', deadline: '2025-05-25', status: 'Selesai', matkul: 'Metodologi Penelitian', matkul_id: 3 },
      { id: 5, judul: 'Diskusi Kelompok AI', deskripsi: 'Diskusikan algoritma klasifikasi untuk proyek AI.', deadline: '2025-06-10', status: 'Belum Selesai', matkul: 'Kecerdasan Buatan', matkul_id: 4 },
    ];
  });

  // Simpan data tugas ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterDeadline, setFilterDeadline] = useState('');

  // Filter tugas berdasarkan status dan deadline
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'Semua' || task.status === filterStatus;
    const matchesDeadline = filterDeadline === '' || task.deadline === filterDeadline;
    return matchesStatus && matchesDeadline;
  });

  // Handler untuk tombol "Tambah Tugas Baru"
  const handleAddTask = () => {
    navigate('/task-form');
  };

  // Handler untuk tombol "Edit" di TaskCard
  const handleEditTask = (taskId) => {
    navigate(`/task-form/${taskId}`);
  };

  // Handler untuk tombol "Hapus" di TaskCard (untuk sementara di sini)
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard Tugas Aktif</h2>

      <div className="row mb-4">
        {/* Filter Status */}
        <div className="col-md-4 mb-3">
          <label htmlFor="statusFilter" className="form-label">Filter Status:</label>
          <select
            id="statusFilter"
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Semua">Semua</option>
            <option value="Belum Selesai">Belum Selesai</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        {/* Filter Deadline */}
        <div className="col-md-4 mb-3">
          <label htmlFor="deadlineFilter" className="form-label">Filter Deadline:</label>
          <input
            type="date"
            id="deadlineFilter"
            className="form-control"
            value={filterDeadline}
            onChange={(e) => setFilterDeadline(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Daftar Tugas</h4>
        <button className="btn btn-primary" onClick={handleAddTask}>
          Tambah Tugas Baru
        </button>
      </div>

      <div className="row">
        {filteredTasks.length > 0 ? (
          filteredTasks
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .map(task => (
              <div key={task.id} className="col-md-6 col-lg-4">
                <TaskCard
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center" role="alert">
              Tidak ada tugas yang ditemukan sesuai filter.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
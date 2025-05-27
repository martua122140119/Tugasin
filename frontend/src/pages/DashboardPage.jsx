import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard.jsx';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal'; // Import komponen modal

function DashboardPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, judul: 'Membuat Desain UI/UX', deskripsi: 'Desain wireframe untuk aplikasi web.', deadline: '2025-06-01', status: 'Belum Selesai', matkul: 'Pemrograman Web', matkul_id: 1 },
      { id: 2, judul: 'Belajar React Hooks', deskripsi: 'Pahami useState, useEffect, useContext.', deadline: '2025-05-28', status: 'Belum Selesai', matkul: 'Pemrograman Web', matkul_id: 1 },
      { id: 3, judul: 'Presentasi Basis Data', deskripsi: 'Siapkan slide presentasi materi normalisasi database.', deadline: '2025-06-05', status: 'Belum Selesai', matkul: 'Basis Data', matkul_id: 2 },
      { id: 4, judul: 'Revisi Laporan Akhir', deskripsi: 'Perbaiki bab 1 dan 2 berdasarkan masukan dosen.', deadline: '2025-05-25', status: 'Selesai', matkul: 'Metodologi Penelitian', matkul_id: 3 },
      { id: 5, judul: 'Diskusi Kelompok AI', deskripsi: 'Diskusikan algoritma klasifikasi untuk proyek AI.', deadline: '2025-06-10', status: 'Belum Selesai', matkul: 'Kecerdasan Hanyalah Buatan' }, // Changed matkul to test
    ];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterDeadline, setFilterDeadline] = useState('');

  // STATE UNTUK MODAL KONFIRMASI
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

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

  // Handler untuk menampilkan modal konfirmasi penghapusan
  const handleDeleteTask = (taskId) => {
    setTaskIdToDelete(taskId);
    setShowConfirmModal(true);
  };

  // Handler saat konfirmasi penghapusan diterima dari modal
  const confirmDeleteTask = () => {
    setTasks(tasks.filter(task => task.id !== taskIdToDelete));
    setShowConfirmModal(false); // Tutup modal
    setTaskIdToDelete(null); // Reset ID yang akan dihapus
  };

  // Handler saat konfirmasi penghapusan dibatalkan
  const cancelDeleteTask = () => {
    setShowConfirmModal(false);
    setTaskIdToDelete(null);
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

      {/* MODAL KONFIRMASI PENGHAPUSAN TUGAS */}
      <ConfirmationModal
        show={showConfirmModal}
        onHide={cancelDeleteTask}
        onConfirm={confirmDeleteTask}
        title="Konfirmasi Penghapusan Tugas"
        message={`Apakah Anda yakin ingin menghapus tugas "${tasks.find(t => t.id === taskIdToDelete)?.judul}"?`}
        confirmText="Ya, Hapus"
        confirmVariant="danger"
      />
    </div>
  );
}

export default DashboardPage;
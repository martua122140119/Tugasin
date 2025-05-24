// src/components/TaskCard.jsx
import React from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Tambahkan onEdit dan onDelete sebagai props
function TaskCard({ task, onEdit, onDelete }) {
  const statusBadgeClass = task.status === 'Selesai' ? 'bg-success' : 'bg-warning text-dark';
  const statusText = task.status === 'Selesai' ? 'Selesai' : 'Belum Selesai';

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          {task.judul}
          <span className={`badge ${statusBadgeClass}`}>{statusText}</span>
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{task.matkul}</h6>
        <p className="card-text">
          <small className="text-muted">Deadline: {formatDate(task.deadline)}</small>
        </p>
        <p className="card-text">{task.deskripsi}</p>
        <div className="d-flex justify-content-end">
          {/* Gunakan onEdit dan onDelete yang diterima dari props */}
          <button
            className="btn btn-sm btn-info me-2"
            onClick={() => onEdit(task.id)} // Panggil onEdit dengan ID tugas
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(task.id)} // Panggil onDelete dengan ID tugas
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
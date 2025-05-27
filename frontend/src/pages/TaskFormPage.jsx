import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [deadline, setDeadline] = useState('');
  const [matkulId, setMatkulId] = useState('');
  const [status, setStatus] = useState('Belum Selesai');

  const [matkuls, setMatkuls] = useState(() => {
    const savedMatkuls = localStorage.getItem('matkuls');
    return savedMatkuls ? JSON.parse(savedMatkuls) : [
      { id: 1, nama_matkul: 'Pemrograman Web' },
      { id: 2, nama_matkul: 'Basis Data' },
    ];
  });

  useEffect(() => {
    if (id) {
      const savedTasks = localStorage.getItem('tasks');
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      const taskToEdit = tasks.find(task => task.id === parseInt(id));

      if (taskToEdit) {
        setJudul(taskToEdit.judul);
        setDeskripsi(taskToEdit.deskripsi);
        setDeadline(taskToEdit.deadline);
        setMatkulId(taskToEdit.matkul_id.toString());
        setStatus(taskToEdit.status);
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      judul,
      deskripsi,
      deadline,
      matkul_id: parseInt(matkulId),
      status,
      matkul: matkuls.find(m => m.id === parseInt(matkulId))?.nama_matkul || 'Tidak Diketahui',
    };

    const savedTasks = localStorage.getItem('tasks');
    let currentTasks = savedTasks ? JSON.parse(savedTasks) : [];

    if (id) {
      currentTasks = currentTasks.map(task =>
        task.id === parseInt(id) ? { ...task, ...taskData } : task
      );
    } else {
      const newId = currentTasks.length > 0 ? Math.max(...currentTasks.map(t => t.id)) + 1 : 1;
      currentTasks = [...currentTasks, { id: newId, ...taskData }];
    }

    localStorage.setItem('tasks', JSON.stringify(currentTasks));
    navigate('/dashboard');
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
                {matkuls.map(matkul => (
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
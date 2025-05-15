import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onSubmit, initialValues, matkuls }) { // Receive matkuls as a prop
  const [judul, setJudul] = useState(initialValues?.judul || '');
  const [deskripsi, setDeskripsi] = useState(initialValues?.deskripsi || '');
  const [deadline, setDeadline] = useState(initialValues?.deadline || '');
  const [matkulId, setMatkulId] = useState(initialValues?.matkulId || (matkuls && matkuls.length > 0 ? matkuls[0].id : '')); // Initialize with first matkul ID if available
  const [status, setStatus] = useState(initialValues?.status || 'belum');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ id: Date.now(), judul, deskripsi, deadline, matkulId, status, user_id: 'dummy' });
    setJudul('');
    setDeskripsi('');
    setDeadline('');
    setMatkulId(matkuls && matkuls.length > 0 ? matkuls[0].id : '');
    setStatus('belum');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="judul">Judul:</label>
        <input
          type="text"
          id="judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder='Buat judul tugas di sini...'
          required
        />
      </div>
      <div>
        <label htmlFor="deskripsi">Deskripsi:</label>
        <textarea
          id="deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder='Buat deskripsi tugas di sini...'
        />
      </div>
      <div>
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="matkulId">Mata Kuliah:</label> {/* Changed label */}
        <select
          id="matkulId"
          value={matkulId}
          onChange={(e) => setMatkulId(e.target.value)}
          required
        >
          {matkuls && matkuls.map((matkul) => (
            <option key={matkul.id} value={matkul.id}>
            {matkul.nama_matkul}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Belum">Belum Selesai</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>
      <button type="Submit">Simpan</button>
    </form>
  );
}

export default TaskForm;
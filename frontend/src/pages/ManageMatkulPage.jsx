import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ManageMatkulPage.css';

export const DUMMY_MATKULS = [
  { id: 1, nama_matkul: 'Pemrograman Web', semester: 'Genap 2024/2025' },
  { id: 2, nama_matkul: 'Struktur Data', semester: 'Genap 2024/2025' },
];

function ManageMatkulPage() {
  const [matkuls, setMatkuls] = useState(DUMMY_MATKULS);
  const [namaMatkulBaru, setNamaMatkulBaru] = useState('');
  const [semesterBaru, setSemesterBaru] = useState('');
  const [editMatkulId, setEditMatkulId] = useState(null);
  const [editNamaMatkul, setEditNamaMatkul] = useState('');
  const [editSemester, setEditSemester] = useState('');

  const handleTambahMatkul = (event) => {
    event.preventDefault();
    const newMatkul = { id: Date.now(), nama_matkul: namaMatkulBaru, semester: semesterBaru };
    setMatkuls([...matkuls, newMatkul]);
    setNamaMatkulBaru('');
    setSemesterBaru('');
  };

  const handleHapusMatkul = (id) => {
    setMatkuls(matkuls.filter(matkul => matkul.id !== id));
  };

  const handleEditMatkul = (matkul) => {
    setEditMatkulId(matkul.id);
    setEditNamaMatkul(matkul.nama_matkul);
    setEditSemester(matkul.semester);
  };

  const handleSimpanEditMatkul = (id) => {
    const updatedMatkuls = matkuls.map(matkul =>
      matkul.id === id ? { ...matkul, nama_matkul: editNamaMatkul, semester: editSemester } : matkul
    );
    setMatkuls(updatedMatkuls);
    setEditMatkulId(null);
  };

  return (
    <div className="manage-matkul-page">
      <div className="page-header">
        <h2>Manajemen Mata Kuliah</h2>
        <Link to="/dashboard" className="back-to-dashboard">Kembali ke Dashboard</Link>
      </div>

      <div className="add-matkul-form">
        <h3>Tambah Mata Kuliah Baru</h3>
        <form onSubmit={handleTambahMatkul}>
          <div>
            <label htmlFor="nama_matkul">Nama Mata Kuliah:</label>
            <input
              type="text"
              id="nama_matkul"
              value={namaMatkulBaru}
              onChange={(e) => setNamaMatkulBaru(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="semester">Semester:</label>
            <input
              type="text"
              id="semester"
              value={semesterBaru}
              onChange={(e) => setSemesterBaru(e.target.value)}
              required
            />
          </div>
          <button type="submit">Tambah</button>
        </form>
      </div>

      <div className="matkul-list">
        <h3>Daftar Mata Kuliah</h3>
        <ul>
          {matkuls.map((matkul) => (
            <li key={matkul.id}>
              {editMatkulId === matkul.id ? (
                <form className="edit-matkul-form" onSubmit={() => handleSimpanEditMatkul(matkul.id)}>
                  <input
                    type="text"
                    value={editNamaMatkul}
                    onChange={(e) => setEditNamaMatkul(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editSemester}
                    onChange={(e) => setEditSemester(e.target.value)}
                  />
                  <button type="submit">Simpan</button>
                  <button type="button" onClick={() => setEditMatkulId(null)}>Batal</button>
                </form>
              ) : (
                <>
                  <span>{matkul.nama_matkul} (Semester {matkul.semester})</span>
                  <div>
                    <button onClick={() => handleEditMatkul(matkul)}>Edit</button>
                    <button className="delete" onClick={() => handleHapusMatkul(matkul.id)}>Hapus</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageMatkulPage;
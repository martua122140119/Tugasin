import React, { useState } from 'react';

function ManageMatkulPage() {
  // Data dummy mata kuliah
  const [courses, setCourses] = useState([
    { id: 1, nama_matkul: 'Pemrograman Web', semester: 'Genap 2024/2025' },
    { id: 2, nama_matkul: 'Basis Data', semester: 'Genap 2024/2025' },
    { id: 3, nama_matkul: 'Struktur Data', semester: 'Ganjil 2024/2025' },
    { id: 4, nama_matkul: 'Algoritma dan Pemrograman', semester: 'Ganjil 2024/2025' },
  ]);

  // State untuk form tambah/edit
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseSemester, setNewCourseSemester] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null); // ID mata kuliah yang sedang diedit

  // Handler untuk submit form tambah/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCourseName || !newCourseSemester) return; // Validasi sederhana

    if (editingCourseId) {
      // Logika Edit
      setCourses(courses.map(course =>
        course.id === editingCourseId
          ? { ...course, nama_matkul: newCourseName, semester: newCourseSemester }
          : course
      ));
      setEditingCourseId(null); // Nonaktifkan mode edit
    } else {
      // Logika Tambah
      const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
      setCourses([...courses, { id: newId, nama_matkul: newCourseName, semester: newCourseSemester }]);
    }

    // Bersihkan form
    setNewCourseName('');
    setNewCourseSemester('');
  };

  // Handler untuk mengaktifkan mode edit
  const handleEdit = (course) => {
    setEditingCourseId(course.id);
    setNewCourseName(course.nama_matkul);
    setNewCourseSemester(course.semester);
  };

  // Handler untuk menghapus mata kuliah
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mata kuliah ini?')) {
      setCourses(courses.filter(course => course.id !== id));
      // Jika yang dihapus sedang diedit, reset mode edit
      if (editingCourseId === id) {
        setEditingCourseId(null);
        setNewCourseName('');
        setNewCourseSemester('');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manajemen Mata Kuliah</h2>

      {/* Form Tambah/Edit Mata Kuliah */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-info text-white">
          <h5>{editingCourseId ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah Baru'}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="courseName" className="form-label">Nama Mata Kuliah</label>
              <input
                type="text"
                className="form-control"
                id="courseName"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Contoh: Pemrograman Web"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="courseSemester" className="form-label">Semester</label>
              <input
                type="text"
                className="form-control"
                id="courseSemester"
                value={newCourseSemester}
                onChange={(e) => setNewCourseSemester(e.target.value)}
                placeholder="Contoh: Genap 2024/2025"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                {editingCourseId ? 'Simpan Perubahan' : 'Tambah Mata Kuliah'}
              </button>
              {editingCourseId && (
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => {
                    setEditingCourseId(null);
                    setNewCourseName('');
                    setNewCourseSemester('');
                  }}
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Daftar Mata Kuliah */}
      <h4 className="mb-3">Daftar Mata Kuliah</h4>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nama Mata Kuliah</th>
              <th>Semester</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>{course.nama_matkul}</td>
                  <td>{course.semester}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(course.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">Belum ada mata kuliah yang ditambahkan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageMatkulPage;
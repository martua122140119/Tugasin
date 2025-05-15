import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList.jsx';
import TaskForm from '../components/TaskForm.jsx';
import './DashboardPage.css';
import { DUMMY_MATKULS } from './ManageMatkulPage.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import Footer from '../components/Footer.jsx'; // Import Footer

const DUMMY_TASKS = [
  { id: 1, judul: 'Tugas 1: Membuat Laporan', deskripsi: 'Laporan analisis data', deadline: '2025-05-20', status: 'belum', matkulId: 1, user_id: 'dummy-user' },
  { id: 2, judul: 'Proyek 1: Pengembangan UI', deskripsi: 'Membuat prototipe antarmuka pengguna', deadline: '2025-05-25', status: 'belum', matkulId: 2, user_id: 'dummy-user' },
  { id: 3, judul: 'Kuis Mingguan', deskripsi: 'Kuis materi minggu ini', deadline: '2025-05-18', status: 'selesai', matkulId: 1, user_id: 'dummy-user' },
];

function DashboardPage() {
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [filterDeadline, setFilterDeadline] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredTasks = tasks.filter(task => {
    const deadlineMatch = filterDeadline
      ? new Date(task.deadline).toLocaleDateString() === new Date(filterDeadline).toLocaleDateString()
      : true;
    const statusMatch = filterStatus ? task.status === filterStatus : true;
    return deadlineMatch && statusMatch;
  });

  const taskToEdit = tasks.find(task => task.id === editingTaskId);

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="user-info">
            <span>Selamat datang, {user?.nama || 'Pengguna'}</span>
            <Link to="/matkul">Manajemen Mata Kuliah</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <h3>{editingTaskId ? 'Edit Tugas' : 'Tambah Tugas Baru'}</h3>
        {editingTaskId ? (
          <TaskForm
            onSubmit={handleUpdateTask}
            initialValues={taskToEdit}
            matkuls={DUMMY_MATKULS}
          />
        ) : (
          <TaskForm onSubmit={handleAddTask} matkuls={DUMMY_MATKULS} />
        )}

        <h3>Daftar Tugas Aktif</h3>
        <div className="dashboard-filters">
          <div>
            <label htmlFor="filterDeadline">Filter Deadline:</label>
            <input
              type="date"
              id="filterDeadline"
              value={filterDeadline}
              onChange={(e) => setFilterDeadline(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="filterStatus">Filter Status:</label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="belum">Belum Selesai</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
        </div>
        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;
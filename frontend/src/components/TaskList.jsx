import React from 'react';
import './TaskList.css';

function TaskList({ tasks, onStatusChange, onEditTask, onDeleteTask }) {
  if (!tasks || tasks.length === 0) {
    return <p>Tidak ada tugas saat ini.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <div className="task-details">
            <h3>{task.judul}</h3>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            <div className="task-status">
              <span>Status: <span className={`status-${task.status}`}>{task.status}</span></span>
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
              >
                <option value="Belum">Belum Selesai</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
          </div>
          <div className="task-actions">
            <button className="delete-button" onClick={() => onDeleteTask(task.id)}>Hapus</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
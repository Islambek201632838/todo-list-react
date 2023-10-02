import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5" style={{width:'1000px'}}>
      <h1 className="text-center mb-4">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="form-control"
          style={{ fontSize: '30px' }}
        />
        <button
          onClick={addTask}
          className="btn btn-primary"
          style={{ fontSize: '30px' }}
        >
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeTask(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { task: task, status: '', backgroundColor: 'white', edit:false }]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleStatusChange = (index, selectedStatus) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        let backgroundColor;
        switch (selectedStatus) {
          case 'done':
            backgroundColor = 'lightgreen';
            break;
          case 'wasnt done':
            backgroundColor = 'lightcoral';
            break;
          default:
            backgroundColor = 'white';
            break;
        }
        return { ...task, status: selectedStatus, backgroundColor };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };
  

  return (
    <div className="container mt-5" style={{ maxWidth: '1000px' }}>
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
          style={{
            fontSize: '30px',
            backgroundColor: task.trim() === '' ? 'grey' : ''
          }}
          disabled={task.trim() === ''}
        >
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((taskObj, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ backgroundColor: taskObj.backgroundColor }}
          >
            {taskObj.edit ? (
              <input 
                type="text"
                value={taskObj.task}
                onChange={(e) => {
                  const updatedTasks = tasks.map((t, i) => {
                    if (i === index) {
                      return { ...t, task: e.target.value };
                    }
                    return t;
                  });
                  setTasks(updatedTasks);
                }}
                className="form-control"
                style={{width:'610px'}}
              />
            ) : (
              taskObj.task
            )}

            <div className="d-flex align-items-center">
              <select
                value={taskObj.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="form-select me-3"
              >
                <option value="">Выбрать статус</option>
                <option value="done">Сделано</option>
                <option value="wasnt done">Не сделано</option>
              </select>
              <button 
                  className={taskObj.edit ? "btn btn-success btn-sm me-1" : "btn btn-primary btn-sm me-1"}
                  onClick={() => {
                      const updatedTasks = tasks.map((t, i) => {
                          if (i === index) {
                              return { ...t, edit: !t.edit };
                          }
                          return t;
                      });
                      setTasks(updatedTasks);
                  }}
              >
                  {taskObj.edit ? "Change" : "Edit"}
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeTask(index)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
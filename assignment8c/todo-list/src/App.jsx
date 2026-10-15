
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  });

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    if (editId !== null) {
      setTasks(tasks.map(task =>
        task.id === editId
          ? { ...task, title: title.trim(), priority }
          : task
      ));
      setEditId(null);
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        title: title.trim(),
        priority,
        completed: false
      }]);
    }

    setTitle('');
    setPriority('Medium');
  }

  function editTask(task) {
    setTitle(task.title);
    setPriority(task.priority);
    setEditId(task.id);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));

    if (editId === id) {
      setEditId(null);
      setTitle('');
      setPriority('Medium');
    }
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  }

  const visibleTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === 'All' ||
      (filter === 'Active' && !task.completed) ||
      (filter === 'Completed' && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h1>My To-Do List</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter task"
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button type="submit">
          {editId !== null ? 'Update Task' : 'Add Task'}
        </button>

        {editId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setTitle('');
              setPriority('Medium');
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <p>Total: {tasks.length}</p>
      <p>Completed: {tasks.filter(t => t.completed).length}</p>
      <p>Pending: {tasks.filter(t => !t.completed).length}</p>

      <input
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

      {visibleTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {visibleTasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              <span
                style={{
                  textDecoration: task.completed
                    ? 'line-through'
                    : 'none'
                }}
              >
                {task.title} — {task.priority}
              </span>

              <button onClick={() => editTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

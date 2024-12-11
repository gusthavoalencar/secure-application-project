'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        const data = await response.json();

        if (response.ok) {
          setTodos(data.todos);
        } else {
          setError(data.error || 'Failed to fetch todos.');
        }
      } catch (err) {
        setError('Failed to load todos. Please try again.');
      }
    };

    fetchTodos();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      setError('Failed to log out. Please try again.');
    }
  };

  const handleCreateTodo = async () => {
    if (!newTodo) {
      setError('Please enter a to-do.');
      return;
    }

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newTodo }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to create to-do.');
        return;
      }

      setNewTodo('');
      setIsModalOpen(false);
      await fetchTodos();
    } catch (err) {
      setError('Failed to create to-do. Please try again.');
    }
  };

  const toggleTodoCompletion = async (id, completed) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        setError('Failed to update to-do status.');
        return;
      }

      await fetchTodos();
    } catch (err) {
      setError('Failed to update to-do status.');
    }
  };

  const editTodo = async (id, content) => {
    const updatedContent = prompt('Edit your to-do:', content);
    if (updatedContent === null || updatedContent === content) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updatedContent }),
      });

      if (!response.ok) {
        setError('Failed to update to-do.');
        return;
      }

      await fetchTodos();
    } catch (err) {
      setError('Failed to update to-do.');
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();

      if (response.ok) {
        setTodos(data.todos);
      } else {
        setError(data.error || 'Failed to fetch todos.');
      }
    } catch (err) {
      setError('Failed to load todos. Please try again.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100 grayBackground">
      <div className="position-absolute top-0 end-0 m-3">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="d-flex align-items-center justify-content-between w-50 mt-5 mb-2">
        <h1 className="text-white fw-bold m-0 mx-auto text-center">To Dos</h1>
        <button
          className="btn btn-primary btn-sm ms-auto"
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group w-50">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={!!todo.completed}
                onChange={() => toggleTodoCompletion(todo.id, !!todo.completed)}
              />
              <span
                className={todo.completed ? 'text-decoration-line-through' : ''}
              >
                {todo.content}
              </span>
            </div>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => editTodo(todo.id, todo.content)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New To-Do</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your to-do"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateTodo}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

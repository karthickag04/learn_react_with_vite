import { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import SelectData from './SelectData';
import EditData from './EditData';
import DeleteData from './DeleteData';
import './App.css';

// Base URL for API calls
const API_URL = 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users. Make sure the backend server is running on port 5000.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new user
  const handleCreate = async (userData) => {
    try {
      setError('');
      setSuccess('');
      await axios.post(`${API_URL}/users`, userData);
      setSuccess('User created successfully!');
      fetchUsers(); // Refresh list
      setTimeout(() => setSuccess(''), 3000);
      return true;
    } catch (err) {
      setError('Failed to create user.');
      console.error('Error creating user:', err);
      return false;
    }
  };

  // Update existing user
  const handleUpdate = async (userId, userData) => {
    try {
      setError('');
      setSuccess('');
      await axios.put(`${API_URL}/users/${userId}`, userData);
      setSuccess('User updated successfully!');
      setEditingUser(null); // Clear editing state
      fetchUsers(); // Refresh list
      setTimeout(() => setSuccess(''), 3000);
      return true;
    } catch (err) {
      setError('Failed to update user.');
      console.error('Error updating user:', err);
      return false;
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    try {
      setError('');
      setSuccess('');
      await axios.delete(`${API_URL}/users/${userId}`);
      setSuccess('User deleted successfully!');
      fetchUsers(); // Refresh list
      setTimeout(() => setSuccess(''), 3000);
      return true;
    } catch (err) {
      setError('Failed to delete user.');
      console.error('Error deleting user:', err);
      return false;
    }
  };

  // Handle edit button click
  const handleEditClick = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>👥 User Management System</h1>
        <p>React + Node.js + MongoDB CRUD Application</p>
      </div>

      <div className="app-content">
        {/* Global Status Messages */}
        {error && <div className="error">❌ {error}</div>}
        {success && <div className="success">✅ {success}</div>}

        {/* Conditional Rendering: Edit Form OR Create Form */}
        {editingUser ? (
          <EditData
            user={editingUser}
            onUpdate={handleUpdate}
            onCancel={handleCancelEdit}
          />
        ) : (
          <Create onCreate={handleCreate} />
        )}

        {/* Display Users List */}
        <SelectData
          users={users}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;

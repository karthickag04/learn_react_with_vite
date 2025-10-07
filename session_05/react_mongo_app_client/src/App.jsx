import { useState, useEffect } from 'react';
import axios from 'axios';

// Base URL for API calls
const API_URL = 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    email: '',
    hobbies: ''
  });
  
  const [editingId, setEditingId] = useState(null);

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Prepare data - convert hobbies string to array
    const userData = {
      ...formData,
      age: Number(formData.age),
      hobbies: formData.hobbies.split(',').map(h => h.trim()).filter(h => h)
    };

    try {
      if (editingId) {
        // Update existing user
        await axios.put(`${API_URL}/users/${editingId}`, userData);
        setSuccess('User updated successfully!');
      } else {
        // Create new user
        await axios.post(`${API_URL}/users`, userData);
        setSuccess('User created successfully!');
      }
      
      // Reset form and refresh users list
      resetForm();
      fetchUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(editingId ? 'Failed to update user.' : 'Failed to create user.');
      console.error('Error submitting form:', err);
    }
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({
      name: user.name,
      age: user.age.toString(),
      city: user.city,
      email: user.email,
      hobbies: user.hobbies.join(', ')
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setError('');
      await axios.delete(`${API_URL}/users/${id}`);
      setSuccess('User deleted successfully!');
      fetchUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete user.');
      console.error('Error deleting user:', err);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      city: '',
      email: '',
      hobbies: ''
    });
    setEditingId(null);
  };

  return (
    <div className="app-container">
      {/* <div className="app-header">
        <h1>👥 User Management System</h1>
        <p>React + Node.js + MongoDB CRUD Application</p>
      </div> */}

      <div className="app-content">
        {/* Status Messages */}
        {error && <div className="error">❌ {error}</div>}
        {success && <div className="success">✅ {success}</div>}

        {/* User Form */}
        <div className="user-form">
          <h2>{editingId ? '✏️ Edit User' : '➕ Add New User'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
              />
            </div>

             <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter age"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hobbies">Hobbies (comma-separated)</label>
              <input
                type="text"
                id="hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleInputChange}
                placeholder="e.g., reading, coding, gaming"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Update User' : '➕ Create User'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  ❌ Cancel
                </button>
              )}
            </div> 
          </form>
        </div>

        {/* Users List */}
         <div className="users-section">
          <h2>📋 All Users ({users.length})</h2>
          
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="no-users">
              No users found. Create your first user above! 👆
            </div>
          ) : (
            <div className="users-list">
              {users.map(user => (
                <div key={user._id} className="user-card">
                  <div className="user-card-header">
                    <h3>{user.name}</h3>
                  </div>
                  <div className="user-info">
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>City:</strong> {user.city}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.hobbies && user.hobbies.length > 0 && (
                      <div>
                        <strong>Hobbies:</strong>
                        <div className="hobbies">
                          {user.hobbies.map((hobby, index) => (
                            <span key={index} className="hobby-tag">
                              {hobby}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="user-actions">
                    <button 
                      className="btn btn-edit" 
                      onClick={() => handleEdit(user)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => handleDelete(user._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

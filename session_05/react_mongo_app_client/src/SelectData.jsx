import { useState, useEffect } from 'react';
import axios from 'axios';

// Base URL for API calls
const API_URL = 'http://localhost:5000';

function SelectData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
   
      <div className="app-content">
        {/* Status Messages */}
        {error && <div className="error">❌ {error}</div>}

        {/* Users List */}
        <div className="users-section">
          <h2>📋 All Users ({users.length})</h2>
          
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="no-users">
              No users found. �
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
   
  );
}

export default SelectData;

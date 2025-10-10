import './SelectData.css';
import DeleteData from './DeleteData';

function SelectData({ users, loading, onEdit, onDelete }) {
  return (
    <div className="users-section">
      <h2>All Users ({users.length})</h2>
      {loading ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="no-users">No users found. Create your first user above!</div>
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
                        <span key={index} className="hobby-tag">{hobby}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="user-actions">
                <button className="btn btn-edit" onClick={() => onEdit(user)}>Edit</button>
                <DeleteData userId={user._id} userName={user.name} onDelete={onDelete} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectData;

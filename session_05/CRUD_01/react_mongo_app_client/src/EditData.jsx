import { useState, useEffect } from 'react';
import './EditData.css';

function EditData({ user, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    email: '',
    hobbies: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        age: user.age.toString(),
        city: user.city,
        email: user.email,
        hobbies: user.hobbies.join(', ')
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
      age: Number(formData.age),
      hobbies: formData.hobbies.split(',').map(h => h.trim()).filter(h => h)
    };
    await onUpdate(user._id, userData);
  };

  return (
    <div className="user-form">
      <h2>Edit User</h2>
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
          <button type="submit" className="btn btn-primary">Update User</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditData;

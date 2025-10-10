import { useState } from 'react';
import './Create.css';

function Create({ onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    email: '',
    hobbies: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data - convert hobbies string to array
    const userData = {
      ...formData,
      age: Number(formData.age),
      hobbies: formData.hobbies.split(',').map(h => h.trim()).filter(h => h)
    };

    // Call parent's onCreate function
    const success = await onCreate(userData);
    
    // Reset form only if successful
    if (success) {
      setFormData({
        name: '',
        age: '',
        city: '',
        email: '',
        hobbies: ''
      });
    }
  };

  return (
    <div className="user-form">
      <h2>➕ Add New User</h2>
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
            ➕ Create User
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;

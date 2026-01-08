import { useState } from 'react';

function FormHandlingExample() {
  // Single input state
  const [name, setName] = useState('');
  
  // Multiple inputs state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    country: '',
    hobbies: [],
    newsletter: false,
    comments: ''
  });

  // Form validation states
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle single input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle multiple inputs change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    if (type === 'checkbox') {
      if (name === 'hobbies') {
        // Handle multiple checkboxes
        setFormData(prev => ({
          ...prev,
          hobbies: checked 
            ? [...prev.hobbies, value]
            : prev.hobbies.filter(hobby => hobby !== value)
        }));
      } else {
        // Handle single checkbox
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.age || formData.age < 1) {
      newErrors.age = 'Valid age is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      gender: '',
      country: '',
      hobbies: [],
      newsletter: false,
      comments: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div>
        <h2>Form Handling Examples</h2>
        <div>
          <h3>Form Submitted Successfully!</h3>
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Country:</strong> {formData.country}</p>
          <p><strong>Hobbies:</strong> {formData.hobbies.join(', ') || 'None'}</p>
          <p><strong>Newsletter:</strong> {formData.newsletter ? 'Yes' : 'No'}</p>
          <p><strong>Comments:</strong> {formData.comments || 'None'}</p>
          
          <button 
            onClick={resetForm}
          >
            Fill Another Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Form Handling Examples</h2>
      
      {/* Simple single input example */}
  <div>
        <h3>Simple Input Example:</h3>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
        <p>You typed: <strong>{name}</strong></p>
      </div>

      {/* Complex form example */}
      <div>
        <h3>Complex Form Example:</h3>
        <form onSubmit={handleSubmit}>
          
          {/* Text inputs */}
          <div>
            <label>
              First Name: *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <span>
                {errors.firstName}
              </span>
            )}
          </div>

          <div>
            <label>
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>
              Email: *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span>
                {errors.email}
              </span>
            )}
          </div>

          <div>
            <label>
              Age: *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
            {errors.age && (
              <span>
                {errors.age}
              </span>
            )}
          </div>

          {/* Radio buttons */}
          <div>
            <label>
              Gender: *
            </label>
            <div>
              <label style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleInputChange}
                />
                Other
              </label>
            </div>
            {errors.gender && (
              <span>
                {errors.gender}
              </span>
            )}
          </div>

          {/* Select dropdown */}
          <div>
            <label>
              Country:
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="">Select a country</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
            </select>
          </div>

          {/* Multiple checkboxes */}
          <div>
            <label>
              Hobbies:
            </label>
            <div>
              {['Reading', 'Gaming', 'Sports', 'Music', 'Traveling'].map(hobby => (
                <label key={hobby}>
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={hobby.toLowerCase()}
                    checked={formData.hobbies.includes(hobby.toLowerCase())}
                    onChange={handleInputChange}
                  />
                  {hobby}
                </label>
              ))}
            </div>
          </div>

          {/* Single checkbox */}
          <div>
            <label>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
              />
              Subscribe to newsletter
            </label>
          </div>

          {/* Textarea */}
          <div>
            <label>
              Comments:
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows="4"
              placeholder="Any additional comments..."
            />
          </div>

          {/* Submit button */}
          <button 
            type="submit"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormHandlingExample;

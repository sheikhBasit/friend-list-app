import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUser = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // State to hold updated data
  const [updatedData, setUpdatedData] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for updating data
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Make Axios PUT request
      const response = await axios.put(
        `http://localhost:3000/api/friends/${formData.id}`,
        {
          name: `${formData.name} ${formData.age}`,
          email: formData.email,
        }
      );

      // Set the updated data in the state
      setUpdatedData(response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts (optional)
    // Uncomment the line below if you want to fetch data on component mount
    // handleUpdate({ preventDefault: () => {} });
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make Axios POST request
      const response = await axios.post('http://localhost:3000/api/friends', {
        name: formData.firstName + ' ' + formData.lastName,
        age: 23, // Assuming a static age for this example
        email: formData.email,
      });

      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
              Age
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
          {updatedData && (
            <div className="mt-4">
              <h4>Updated Data:</h4>
              <pre>{JSON.stringify(updatedData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

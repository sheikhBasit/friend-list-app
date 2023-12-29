import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const GetUser = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
  });

  // State to hold fetched data
  const [fetchedData, setFetchedData] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make Axios GET request
      const response = await axios.get('http://localhost:3001/friendByEmail', {
        params: {
          email: formData.email,
        },
      });

      // Set the fetched data in the state
      setFetchedData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">
              Fetch Data
            </button>
          </form>

          {fetchedData && (
            <div className="mt-4">
              <h4>Fetched Data:</h4>
              <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetUser;

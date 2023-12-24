import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteUser = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '', // Only need the email for deletion
  });

  // State to hold delete response data
  const [deleteResponse, setDeleteResponse] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for deleting data
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Make Axios DELETE request with the email parameter
      const response = await axios.delete('http://localhost:3000/api/friends', {
        data: { email: formData.email },
      });

      // Set the delete response data in the state
      setDeleteResponse(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts (optional)
    // Uncomment the line below if you want to fetch data on component mount
    // handleSubmit({ preventDefault: () => {} });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleDelete}>
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

            <button type="submit" className="btn btn-danger">
              Delete User
            </button>
          </form>

          {deleteResponse && (
            <div className="mt-4">
              <h4>Delete User Response:</h4>
              <pre>{JSON.stringify(deleteResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;

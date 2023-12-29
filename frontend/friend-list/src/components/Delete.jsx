import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteUser = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [deleteResponse, setDeleteResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Make Axios GET request to retrieve the user ID by email
      const response = await axios.get(`http://localhost:3001/friendIdByEmail/${formData.email}`);
      
      if (response.data.id) {
        // Make Axios DELETE request using the obtained ID
        const deleteResponse = await axios.delete(`http://localhost:3001/deleteByEmail/${formData.email}`);
        setDeleteResponse(deleteResponse.data);

        // Reset the email field after successful deletion
        setFormData((prevData) => ({
          ...prevData,
          email: '',
        }));
      } else {
        setDeleteResponse({ message: 'Friend not found.' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setDeleteResponse({ message: 'Error deleting user. Please try again.' });
    }
  };

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

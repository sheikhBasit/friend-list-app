import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUser = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    email: '',
  });
  const [updatedData, setUpdatedData] = useState(null);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFetchUserId = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3001/friendIdByEmail/${userEmail}`);
      const { id } = response.data;

      const userDataResponse = await axios.get(`http://localhost:3001/friends/${id}`);
      
      setUserData(userDataResponse.data);
      setFormData({
        id: userDataResponse.data._id,
        name: userDataResponse.data.name,
        age: userDataResponse.data.age,
        email: userDataResponse.data.email,
      });
      setError(null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      console.error('Error response:', error.response);
      setError('Error fetching user data. Please try again.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3001/update/${formData.id}`, {
        name: formData.name,
        age: formData.age,
        email: formData.email,
      });

      setUpdatedData(response.data);
      setFormData({
        id: '',
        name: '',
        age: '',
        email: '',
      });
      setError(null);
      setFormVisible(false);
    } catch (error) {
      console.error('Error updating data:', error);
      console.error('Error response:', error.response);
      setError('Error updating data. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {(
            <form onSubmit={handleFetchUserId}>
              <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">
                  User Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  name="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Fetch User Data
              </button>
            </form>
          )}

          {userData && formVisible && (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
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
                <label htmlFor="age" className="form-label">
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
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          )}

          {error && <p className="text-danger mt-3">{error}</p>}
          {updatedData && (
            <div className="mt-4">
              <h4>Updated Data:</h4>
              <pre>{JSON.stringify(updatedData)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

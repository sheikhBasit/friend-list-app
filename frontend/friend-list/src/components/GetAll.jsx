import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const GetAll = () => {
  // State to hold fetched data
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);

  // Effect to fetch data on component mount
  
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/friends');
        
        // Assuming your server returns an array as expected
        if (Array.isArray(response.data)) {
          setFetchedData(response.data);
        } else {
          setError('Invalid data format received from the server.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
  
        if (error.response && error.response.status === 400) {
          setError('Bad Request. Check server logs for more details.');
        } else {
          setError(`Error fetching data. ${error.message}`);
        }
      }
    };
  
    fetchData();
  }, []);
    
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            fetchedData && (
              <div className="mt-4">
                <h4>All Friends Data:</h4>
                <ul>
                  {fetchedData.map((friend) => (
                    <li key={friend._id}>
                      <h5>Name: {friend.name}</h5>
                      <h5>Age: {friend.age}</h5>
                      <p>Email: {friend.email}</p>
                      {/* Add other fields as needed */}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAll;

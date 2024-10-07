import React, { useState } from 'react';
import axios from 'axios';

const RequestAdmin = () => {
  const [message, setMessage] = useState('');

  const handleRequestAdmin = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume the JWT token is stored in localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Send POST request to backend to request admin privileges
      const response = await axios.post('http://localhost:3001/api/requests/request-admin', {}, config);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Request Admin Role</h2>
      <button className="btn btn-primary" onClick={handleRequestAdmin}>
        Request Admin Privileges
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default RequestAdmin;

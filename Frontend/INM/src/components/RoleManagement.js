
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UsersList from './UsersList';

const RoleManagement = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null); 

  const token = localStorage.getItem('token'); 
  
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: { Authorization: `Bearer ${token}` }, // Attach the token to the request
      });
      setUsers(response.data); 
      setLoading(false); 
    } catch (error) {
      setError('Failed to fetch users');
      console.error(error);
      setLoading(false); 
    }
  }, [token]); 
  useEffect(() => {
    fetchUsers(); 
  }, [fetchUsers]); 
  const handleGrantAdmin = async (userId) => {
    await updateRole(userId, 'grant-admin');
  };


  const handleRevokeAdmin = async (userId) => {
    await updateRole(userId, 'revoke-admin');
  };

  
  const updateRole = async (userId, action) => {
    try {
      await axios.patch(`http://localhost:3001/api/users/${action}/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      setMessage(`Successfully ${action === 'grant-admin' ? 'granted' : 'revoked'} admin privileges`);
      fetchUsers(); 
    } catch (error) {
      setError(`Failed to ${action === 'grant-admin' ? 'grant' : 'revoke'} admin privileges`);
      console.error(error);
    }
  };

  // Function to delete a user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Attach the token to the request
      });
      setMessage('User deleted successfully');
      fetchUsers(); 
    } catch (error) {
      setError('Failed to delete user');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-2xl font-bold mb-4">Role Management</h1>
      {message && <p className="alert alert-success">{message}</p>}
      {loading ? (
        <div className="text-center">
          <p className="text-muted">Loading...</p>
        </div>
      ) : error ? (
        <p className="alert alert-danger">{error}</p>
      ) : (
        <UsersList
          users={users}
          onGrantAdmin={handleGrantAdmin}
          onRevokeAdmin={handleRevokeAdmin}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default RoleManagement;

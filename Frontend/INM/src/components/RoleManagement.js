
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UsersList from './UsersList';

const RoleManagement = () => {
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [message, setMessage] = useState(''); // State to show success or failure messages
  const [error, setError] = useState(null); // State to hold error messages

  const token = localStorage.getItem('token'); // Retrieve the JWT from local storage

  // Function to fetch all users from the server, wrapped in useCallback to prevent re-creation
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: { Authorization: `Bearer ${token}` }, // Attach the token to the request
      });
      setUsers(response.data); // Set the state with the fetched users
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      setError('Failed to fetch users');
      console.error(error);
      setLoading(false); // Set loading to false if an error occurs
    }
  }, [token]); // Add dependencies that `fetchUsers` relies on

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, [fetchUsers]); // `fetchUsers` won't change on every render due to useCallback

  // Function to grant admin privileges to a user
  const handleGrantAdmin = async (userId) => {
    await updateRole(userId, 'grant-admin');
  };

  // Function to revoke admin privileges from a user
  const handleRevokeAdmin = async (userId) => {
    await updateRole(userId, 'revoke-admin');
  };

  // Function to update the user's role
  const updateRole = async (userId, action) => {
    try {
      await axios.patch(`http://localhost:3001/api/users/${action}/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }, // Attach the token to the request
      });
      setMessage(`Successfully ${action === 'grant-admin' ? 'granted' : 'revoked'} admin privileges`);
      fetchUsers(); // Refresh the user list after updating role
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
      fetchUsers(); // Refresh the user list after deleting a user
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

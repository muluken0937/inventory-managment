import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UsersList from './UsersList'; // Import UsersList component
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons
import '../CSS/RoleManagement.css'; // Ensure to import your CSS for styling

const RoleManagement = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const token = localStorage.getItem('token'); 
  
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: { Authorization: `Bearer ${token}` },
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
      setShowPopup(true); // Show popup on successful action
      fetchUsers(); 
    } catch (error) {
      setError(`Failed to ${action === 'grant-admin' ? 'grant' : 'revoke'} admin privileges`);
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('User deleted successfully');
      setShowPopup(true); // Show popup on successful deletion
      fetchUsers(); 
    } catch (error) {
      setError('Failed to delete user');
      console.error(error);
    }
  };

  // Filter users based on search query and sort them
  const filteredUsers = users
    .filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      // Sort Super Admin first, then sort by username
      if (a.role === 'Super Admin') return -1;
      if (b.role === 'Super Admin') return 1;
      return a.username.localeCompare(b.username);
    });

  return (
    <div className="container mt-4">
      <h1 className="text-center text-2xl font-bold mb-4">Role Management</h1>
      {loading ? (
        <div className="text-center">
          <p className="text-muted">Loading...</p>
        </div>
      ) : error ? (
        <p className="alert alert-danger">{error}</p>
      ) : (
        <>
          <div className="mb-3 d-flex justify-content-end">
            <div className="input-group" style={{ width: '220px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="input-group-text">
                <FaSearch />
              </span>
            </div>
          </div>

          {/* Use UsersList component to display the list of users */}
          <UsersList
            users={filteredUsers} // Pass filtered users
            onGrantAdmin={handleGrantAdmin}
            onRevokeAdmin={handleRevokeAdmin}
            onDeleteUser={handleDeleteUser}
          />

          {showPopup && (
            <div className={`popup ${error ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RoleManagement;

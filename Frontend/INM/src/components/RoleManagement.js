
// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import UsersList from './UsersList';

// const RoleManagement = () => {
//   const [users, setUsers] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState(null); 

//   const token = localStorage.getItem('token'); 
  
//   const fetchUsers = useCallback(async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/api/users', {
//         headers: { Authorization: `Bearer ${token}` }, // Attach the token to the request
//       });
//       setUsers(response.data); 
//       setLoading(false); 
//     } catch (error) {
//       setError('Failed to fetch users');
//       console.error(error);
//       setLoading(false); 
//     }
//   }, [token]); 
//   useEffect(() => {
//     fetchUsers(); 
//   }, [fetchUsers]); 
//   const handleGrantAdmin = async (userId) => {
//     await updateRole(userId, 'grant-admin');
//   };


//   const handleRevokeAdmin = async (userId) => {
//     await updateRole(userId, 'revoke-admin');
//   };

  
//   const updateRole = async (userId, action) => {
//     try {
//       await axios.patch(`http://localhost:3001/api/users/${action}/${userId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }, 
//       });
//       setMessage(`Successfully ${action === 'grant-admin' ? 'granted' : 'revoked'} admin privileges`);
//       fetchUsers(); 
//     } catch (error) {
//       setError(`Failed to ${action === 'grant-admin' ? 'grant' : 'revoke'} admin privileges`);
//       console.error(error);
//     }
//   };

//   // Function to delete a user
//   const handleDeleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/users/delete-user/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` }, // Attach the token to the request
//       });
//       setMessage('User deleted successfully');
//       fetchUsers(); 
//     } catch (error) {
//       setError('Failed to delete user');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="text-center text-2xl font-bold mb-4">Role Management</h1>
//       {message && <p className="alert alert-success">{message}</p>}
//       {loading ? (
//         <div className="text-center">
//           <p className="text-muted">Loading...</p>
//         </div>
//       ) : error ? (
//         <p className="alert alert-danger">{error}</p>
//       ) : (
//         <UsersList
//           users={users}
//           onGrantAdmin={handleGrantAdmin}
//           onRevokeAdmin={handleRevokeAdmin}
//           onDeleteUser={handleDeleteUser}
//         />
//       )}
//     </div>
//   );
// };

// export default RoleManagement;
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import UsersList from './UsersList';
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons

const RoleManagement = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

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
      fetchUsers(); 
    } catch (error) {
      setError('Failed to delete user');
      console.error(error);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <>
          <div className="mb-3 d-flex justify-content-end"> {/* Align items to the right */}
            <div className="input-group" style={{ width: '220px' }}> {/* Set a specific width */}
              <input
                type="text"
                className="form-control" // Add Bootstrap class for styling
                placeholder="Search by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="input-group-text">
                <FaSearch />
              </span>
            </div>
          </div>
          
          {/* Pass filtered users to UsersList */}
          <UsersList
            users={filteredUsers} // Use filteredUsers instead of users
            onGrantAdmin={handleGrantAdmin}
            onRevokeAdmin={handleRevokeAdmin}
            onDeleteUser={handleDeleteUser}
          />
        </>
      )}
    </div>
  );
};

export default RoleManagement;

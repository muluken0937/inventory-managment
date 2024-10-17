// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RequestAdmin = () => {
//   const [role, setRole] = useState('');
//   const [revokedAdmin, setRevokedAdmin] = useState(false);
//   const [requestStatus, setRequestStatus] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   // Fetch user role and status on component mount
//   useEffect(() => {
//     fetchUserRoleAndRequestStatus();
//   }, []);

//   // Function to fetch current user role and admin request status
//   const fetchUserRoleAndRequestStatus = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
//       const config = {
//         headers: { Authorization: `Bearer ${token}` }
//       };

//       // Fetch user role and revoked admin status from backend
//       const response = await axios.get('http://localhost:3001/api/requests/current-role', config);

//       setRole(response.data.role); // Set user role (e.g., Admin or User)
//       setRevokedAdmin(response.data.revokedAdmin); // Set revoked admin status
//       setRequestStatus(response.data.adminRequestStatus || ''); // Handle the request status if provided
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Error fetching status or role.');
//     }
//   };

//   // Function to handle the request for admin rights (or re-request)
//   const handleRequestAdmin = async () => {
//     setLoading(true); // Set loading state to true during the request

//     try {
//       const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
//       const config = {
//         headers: { Authorization: `Bearer ${token}` }
//       };

//       // Send a request to apply or re-apply for admin privileges
//       const response = await axios.post('http://localhost:3001/api/requests/request-admin', {}, config);

//       // Handle success response
//       setMessage(response.data.message);
//       fetchUserRoleAndRequestStatus(); // Refresh the status after successful request
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Error requesting admin privileges.');
//     } finally {
//       setLoading(false); // Set loading state back to false once the request is done
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Request Admin Role</h2>
//       {message && <div className="alert alert-info">{message}</div>}

//       {role === 'Admin' ? (
//         <div className="alert alert-success">You are already an admin.</div>
//       ) : revokedAdmin ? (
//         <>
//           <div className="alert alert-warning">Your admin rights were revoked. You may re-apply.</div>
//           <button className="btn btn-primary" onClick={handleRequestAdmin} disabled={loading}>
//             {loading ? 'Re-requesting Admin Privileges...' : 'Re-request Admin Privileges'}
//           </button>
//         </>
//       ) : role === 'User' && requestStatus === 'Pending' ? (
//         <div className="alert alert-warning">Your request is currently pending approval.</div>
//       ) : (
//         <>
//           <div className="alert alert-info">You are currently a user. You can request admin privileges.</div>
//           <button className="btn btn-primary" onClick={handleRequestAdmin} disabled={loading}>
//             {loading ? 'Requesting Admin Privileges...' : 'Request Admin Privileges'}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default RequestAdmin;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestAdmin = () => {
  const [role, setRole] = useState('');
  const [revokedAdmin, setRevokedAdmin] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserRoleAndRequestStatus();
  }, []);

  const fetchUserRoleAndRequestStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.get('http://localhost:3001/api/requests/current-role', config);
      setRole(response.data.role);
      setRevokedAdmin(response.data.revokedAdmin);
      setRequestStatus(response.data.adminRequestStatus || '');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error fetching status or role.');
    }
  };

  const handleRequestAdmin = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.post('http://localhost:3001/api/requests/request-admin', {}, config);

      setMessage(response.data.message);
      fetchUserRoleAndRequestStatus();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error requesting admin privileges.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Request Admin Role</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {role === 'Admin' ? (
        <div className="alert alert-success">You are already an admin.</div>
      ) : revokedAdmin ? (
        <>
          <div className="alert alert-warning">Your admin rights were revoked. You may re-apply.</div>
          <button className="btn btn-primary" onClick={handleRequestAdmin} disabled={loading}>
            {loading ? 'Processing...' : 'Re-apply for Admin Role'}
          </button>
        </>
      ) : (
        <>
          <div className="alert alert-secondary">
            {requestStatus === 'Pending'
              ? 'Your request is pending approval.'
              : 'You can request admin privileges.'}
          </div>
          {requestStatus !== 'Pending' && (
            <button className="btn btn-primary" onClick={handleRequestAdmin} disabled={loading}>
              {loading ? 'Processing...' : 'Request Admin Role'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RequestAdmin;

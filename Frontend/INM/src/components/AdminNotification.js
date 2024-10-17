import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAdminNotifications();
  }, []);

  const fetchAdminNotifications = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume the JWT token is stored in localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Fetch all pending admin notifications
      const response = await axios.get('http://localhost:3001/api/requests/admin-requests', config);
      setNotifications(response.data);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error. Please try again.');
    }
  };

  const handleNotificationAction = async (notificationId, status) => {
    try {
      const token = localStorage.getItem('token'); // Assume the JWT token is stored in localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Send PATCH request to update admin notification status
      const response = await axios.patch(
        `http://localhost:3001/api/requests/admin-requests/${notificationId}`,
        { status },
        config
      );

      setMessage(response.data.message);
      fetchAdminNotifications(); // Refresh the list after updating
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Pending Admin Notifications</h2>
      {message && <p className="mt-3">{message}</p>}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <tr key={notification._id}>
                <td>{notification.userId.email}</td>
                <td>{notification.status}</td>
                <td>
                  <button className="btn btn-success mx-2" onClick={() => handleNotificationAction(notification._id, 'Approved')}>
                    Approve
                  </button>
                  <button className="btn btn-danger mx-2" onClick={() => handleNotificationAction(notification._id, 'Rejected')}>
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No pending notifications</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNotification;


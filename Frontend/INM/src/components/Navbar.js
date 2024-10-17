

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from 'react-icons/fa'; // Import notification bell icon

const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Get user role from localStorage
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Function to fetch the count of pending admin notifications
  const fetchNotificationCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (role === 'Super Admin') {
        const response = await axios.get('http://localhost:3001/api/requests/admin-requests', config);
        // Filter for pending notifications only
        const pendingNotifications = response.data.filter((notification) => notification.status === 'Pending');
        setNotificationCount(pendingNotifications.length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error.response ? error.response.data.message : 'Server error');
    }
  }, [role]); // Include 'role' as a dependency to ensure the function updates when the role changes.

  useEffect(() => {
    if (role === 'Super Admin') {
      fetchNotificationCount();
    }
  }, [role, fetchNotificationCount]); // Include 'fetchNotificationCount' in the dependency array

  // Determine if we are on the authentication pages
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        {/* Options dropdown on the left side */}
        {!isAuthPage && (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginRight: '20px' }}>
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle fs-5"
                type="button"
                id="userOptionsDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Options
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="userOptionsDropdown">
                {/* Show the current role */}
                <li className="dropdown-item text-white fs-5">
                  <span>Role: {role}</span>
                </li>

                {/* Conditionally render "User List" for Super Admin only */}
                {role === 'Super Admin' && (
                  <li>
                    <NavLink className="dropdown-item text-white fs-5" to="/user-management">
                      User List
                    </NavLink>
                  </li>
                )}

                {/* Conditionally render "Request Admin Role" for User role only */}
                {role === 'User' && (
                  <li>
                    <NavLink className="dropdown-item text-white fs-5" to="/request-admin">
                      Request Admin Role
                    </NavLink>
                  </li>
                )}

                {/* Logout button inside the dropdown menu */}
                <li>
                  <button className="dropdown-item text-danger fs-5" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        )}

        {/* Brand link with margin for spacing */}
        <NavLink className="navbar-brand text-white" to="/home" style={{ marginLeft: '10px' }}>
          Inventory Management
        </NavLink>

        {/* Navbar links for Home, Products, and About */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={`nav-link fs-4 ${location.pathname === '/home' ? 'active-route' : 'text-white'}`}
                to="/home"
                style={{ transition: 'color 0.3s' }} // Smooth transition effect for hover
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link fs-4 ${location.pathname === '/products' ? 'active-route' : 'text-white'}`}
                to="/products"
                style={{ transition: 'color 0.3s' }}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link fs-4 ${location.pathname === '/about' ? 'active-route' : 'text-white'}`}
                to="/about"
                style={{ transition: 'color 0.3s' }}
              >
                About
              </NavLink>
            </li>

            {/* Notification Icon for Super Admin only */}
            {role === 'Super Admin' && (
              <li className="nav-item position-relative">
                <NavLink to="/admin-notifications" className="nav-link text-white fs-4">
                  <FaBell style={{ fontSize: '1.5rem' }} />
                  {notificationCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

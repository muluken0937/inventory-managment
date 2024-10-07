

// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
 
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Assumes 'user' was stored as a JSON string

  
  const isAuthenticated = token !== null;

 
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If roles are provided, ensure the user has one of the required roles
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/not-authorized" replace />; // Redirect to "Not Authorized" page
  }

  // If authenticated and authorized, render the child components
  return children;
};

export default PrivateRoute;

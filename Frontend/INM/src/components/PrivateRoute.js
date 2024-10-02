// import React from 'react';
// import { Navigate } from 'react-router-dom';

// function PrivateRoute({ children }) {
//     const authToken = localStorage.getItem('authToken'); // Check if the token is stored

//     return authToken ? children : <Navigate to="/" />; // If not authenticated, redirect to login
// }

// export default PrivateRoute;


// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check for the presence of 'token' in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;

  // If authenticated, render the children components, otherwise redirect to login page
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;

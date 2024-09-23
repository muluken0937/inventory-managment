import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const authToken = localStorage.getItem('authToken'); // Check if the token is stored

    return authToken ? children : <Navigate to="/" />; // If not authenticated, redirect to login
}

export default PrivateRoute;

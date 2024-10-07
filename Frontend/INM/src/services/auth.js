// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Simulate async auth check, replace this with real API call
    const token = localStorage.getItem('token');
    if (token) {
      // Retrieve user info from localStorage or decode JWT to get user details
      const storedUser = JSON.parse(localStorage.getItem('user')); // Adjust according to your storage logic
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Auth check complete
  }, []);

  return { isAuthenticated, user, loading };
};

export default useAuth;

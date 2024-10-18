
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Function to validate the email format using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Check if the email is valid
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Prepare user data
    const userData = {
      email: email.trim(),
      password,
    };

    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Check if the login was successful
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Save token and role to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        // Reset form fields and error state
        setEmail('');
        setPassword('');
        setError('');

        // Redirect to /home after successful login
        navigate('/home');
      } else {
        // Handle errors returned by the API
        const errorData = await response.json();
        setError(errorData.message || errorData.errors[0].msg || "Invalid credentials");
        console.log("Error during login:", errorData);
      }
    } catch (err) {
      // Handle any unexpected errors during the login process
      console.error("Error during login:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container-fluid p-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="mb-4 text-center">User Login</h1>

          {/* Display error message if any */}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Link to Register page */}
          <div className="mt-3 text-center">
            Don't have an account?
            <NavLink to="/register"> Register here.</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

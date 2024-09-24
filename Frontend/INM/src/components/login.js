import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { email: email.trim(), password };

        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token); 
                navigate('/home'); 
            } else {
                const errorData = await response.json();
                setError(errorData.message); // Show specific error message
            }
        } catch (err) {
            setError("An error occurred during login.");
        }
    };

    return (
        <div className='container-fluid p-5'>
            <h1 className='mb-4 text-center'>User Login</h1>
            {error && <p className='text-danger text-center'>{error}</p>}
            <form onSubmit={handleSubmit} className='mx-auto' style={{ maxWidth: '400px' }}>
                <div className="form-group mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="mt-3 text-center">
                Don't have an account? 
                <NavLink to="/register">Register here.</NavLink>
            </div>
        </div>
    );
}

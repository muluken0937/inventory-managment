import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get current location

    const handleLogout = () => {
        // Clear session or token storage
        localStorage.removeItem('userToken'); // If you're using local storage to save the token
        sessionStorage.removeItem('userSession'); // If you're using session storage

        // Redirect to the root page (login page)
        navigate('/');
    };

    // Check if the current path is login or register
    const isAuthPage = location.pathname === '/' || location.pathname === '/register';

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-white fs-4" aria-current="page" href="/home">
                                    Inventory Management System
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-white fs-4" href="/products">
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active text-white fs-4" href="/about">
                                    About
                                </a>
                            </li>
                            {/* Conditionally render logout button if not on login or register page */}
                            {!isAuthPage && (
                                <li className="nav-item">
                                    <button 
                                        className="btn btn-danger fs-5 ms-3" 
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

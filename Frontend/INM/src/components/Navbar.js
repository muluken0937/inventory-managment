import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        // Clear token and role from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        
        // Redirect to the login page
        navigate('/');
    };

    // Check if the current path is the login or register page
    const isAuthPage = location.pathname === '/' || location.pathname === '/register';

    return (
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
                            <NavLink className="nav-link active text-white fs-4" to="/home">
                                Inventory Management System
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active text-white fs-4" to="/products">
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active text-white fs-4" to="/about">
                                About
                            </NavLink>
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
    );
};

export default Navbar;

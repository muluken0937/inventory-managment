


import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const role = localStorage.getItem('role'); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');  
        navigate('/');
    };

    const isAuthPage = location.pathname === '/' || location.pathname === '/register';

    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                {/* Options dropdown on the left side */}
                {!isAuthPage && (
                    <ul className="navbar-nav ms-0 mb-2 mb-lg-0">
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
                                <li className="dropdown-item text-white fs-5">Role: {role}</li>

                                {/* Conditionally render User List for Super Admin only */}
                                {role === 'Super Admin' && (
                                    <li>
                                        <NavLink className="dropdown-item text-white fs-5" to="/user-management">
                                            User List
                                        </NavLink>
                                    </li>
                                )}

                                {/* Logout button inside the dropdown menu */}
                                <li>
                                    <button
                                        className="dropdown-item text-danger fs-5"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                )}

                {/* Navbar links for Products, About, and Inventory Management System */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* Inventory Management System branding moved to the right */}
                        <li className="nav-item">
                            <NavLink className="nav-link active text-white fs-4" to="/home">
                                Inventory Management System
                            </NavLink>
                        </li>
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
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


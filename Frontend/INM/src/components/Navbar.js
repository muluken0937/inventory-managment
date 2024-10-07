


// import React from 'react';
// import { useNavigate, useLocation, NavLink } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const role = localStorage.getItem('role');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   const isAuthPage = location.pathname === '/' || location.pathname === '/register';

//   return (
//     <nav className="navbar navbar-expand-lg bg-dark">
//       <div className="container-fluid">
//         {/* Options dropdown on the left side */}
//         {!isAuthPage && (
//           <ul className="navbar-nav ms-0 mb-2 mb-lg-0">
//             <li className="nav-item dropdown">
//               <button
//                 className="btn btn-outline-light dropdown-toggle fs-5"
//                 type="button"
//                 id="userOptionsDropdown"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 Options
//               </button>
//               <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="userOptionsDropdown">
//                 <li className="dropdown-item text-white fs-5">Role: {role}</li>

//                 {/* Conditionally render User List for Super Admin only */}
//                 {role === 'Super Admin' && (
//                   <li>
//                     <NavLink className="dropdown-item text-white fs-5" to="/user-management">
//                       User List
//                     </NavLink>
//                   </li>
//                 )}

//                 {/* Logout button inside the dropdown menu */}
//                 <li>
//                   <button className="dropdown-item text-danger fs-5" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         )}

//         {/* Navbar links for Home, Products, and About */}
//         <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <NavLink
//                 className={`nav-link fs-4 ${
//                   location.pathname === '/home' ? 'active-route' : 'text-white'
//                 }`}
//                 to="/home"
//                 style={{ transition: 'color 0.3s' }} // Smooth transition effect for hover
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 className={`nav-link fs-4 ${
//                   location.pathname === '/products' ? 'active-route' : 'text-white'
//                 }`}
//                 to="/products"
//                 style={{ transition: 'color 0.3s' }}
//               >
//                 Products
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 className={`nav-link fs-4 ${
//                   location.pathname === '/about' ? 'active-route' : 'text-white'
//                 }`}
//                 to="/about"
//                 style={{ transition: 'color 0.3s' }}
//               >
//                 About
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

const Navbar = () => {
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
                <li className="dropdown-item text-white fs-5">Role: {role}</li>

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

                {/* Conditionally render "Manage Admin Notifications" for Super Admin only */}
                {role === 'Super Admin' && (
                  <li>
                    <NavLink className="dropdown-item text-white fs-5" to="/admin-notifications">
                      Manage Admin Notifications
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
                className={`nav-link fs-4 ${
                  location.pathname === '/home' ? 'active-route' : 'text-white'
                }`}
                to="/home"
                style={{ transition: 'color 0.3s' }} // Smooth transition effect for hover
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link fs-4 ${
                  location.pathname === '/products' ? 'active-route' : 'text-white'
                }`}
                to="/products"
                style={{ transition: 'color 0.3s' }}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link fs-4 ${
                  location.pathname === '/about' ? 'active-route' : 'text-white'
                }`}
                to="/about"
                style={{ transition: 'color 0.3s' }}
              >
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

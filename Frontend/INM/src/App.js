
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Products from './components/Products';
// import InsertProduct from './components/InsertProduct';
// import UpdateProduct from './components/UpdateProduct';
// import About from './components/About';
// import Register from './components/register'; 
// import Login from './components/Login';
// import PrivateRoute from './components/PrivateRoute';
// import RoleManagement from './components/RoleManagement';
// import RegisterSuperAdmin from './components/RegisterSuperAdmin'; 
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const location = useLocation();

//   // Define paths where the Navbar should not be displayed
//   const hideNavbarPaths = ['/', '/register', '/register-super-admin'];

//   return (
//     <div className="App">
//       {/* Conditionally render Navbar based on the current route */}
//       {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/register-super-admin" element={<RegisterSuperAdmin />} />

//         {/* Protected routes */}
//         <Route
//           path="/home"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/products"
//           element={
//             <PrivateRoute>
//               <Products />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/insertproduct"
//           element={
//             <PrivateRoute roles={['Admin', 'Super Admin']}>
//               <InsertProduct />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/updateproduct/:id"
//           element={
//             <PrivateRoute>
//               <UpdateProduct />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <PrivateRoute>
//               <About />
//             </PrivateRoute>
//           }
//         />
//         {/* Role management route */}
//         <Route
//           path="/user-management"
//           element={
//             <PrivateRoute roles={['Super Admin']}>
//               <RoleManagement />
//             </PrivateRoute>
//           }
//         />
        
//         {/* Redirect to login for unmatched routes */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </div>
//   );
// }

// // Wrap App in Router to use useLocation
// const WrappedApp = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default WrappedApp;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct';
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';
import Register from './components/register'; 
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import RoleManagement from './components/RoleManagement';
import RegisterSuperAdmin from './components/RegisterSuperAdmin'; 
import RequestAdmin from './components/RequestAdmin'; // Import RequestAdmin component
import AdminNotification from './components/AdminNotification'; // Import AdminNotification component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();

  // Define paths where the Navbar should not be displayed
  const hideNavbarPaths = ['/', '/register', '/register-super-admin'];

  return (
    <div className="App">
      {/* Conditionally render Navbar based on the current route */}
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-super-admin" element={<RegisterSuperAdmin />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/insertproduct"
          element={
            <PrivateRoute roles={['Admin', 'Super Admin']}>
              <InsertProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateproduct/:id"
          element={
            <PrivateRoute>
              <UpdateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        
        {/* Role management route - accessible only by Super Admin */}
        <Route
          path="/user-management"
          element={
            <PrivateRoute roles={['Super Admin']}>
              <RoleManagement />
            </PrivateRoute>
          }
        />

        {/* Request Admin Route - Accessible only by User role */}
        <Route
          path="/request-admin"
          element={
            <PrivateRoute roles={['User']}>
              <RequestAdmin />
            </PrivateRoute>
          }
        />

        {/* Admin Notification Route - Accessible only by Super Admin */}
        <Route
          path="/admin-notifications"
          element={
            <PrivateRoute roles={['Super Admin']}>
              <AdminNotification />
            </PrivateRoute>
          }
        />

        {/* Redirect to login for unmatched routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

// Wrap App in Router to use useLocation
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;

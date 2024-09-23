import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct';
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';
import Home from './components/Home';
import Register from './components/register';
import Login from './components/login';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar title="IMS" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protect routes by wrapping them in PrivateRoute */}
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
              <PrivateRoute>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

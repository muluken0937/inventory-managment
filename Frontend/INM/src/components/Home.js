import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function Home() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <div
        className='container-fluid p-5 flex-grow-1'
        style={{
          backgroundImage: 'url(istockphoto-1465188429-612x612.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white', // Adjust text color for better contrast
        }}
      >
        <h2 className='text-center display-4 fw-bold'>Welcome to Our Inventory Management</h2>

        {/* Call to Action Button */}
        <div className='text-center my-4'>
          <Link to="/products" className='btn btn-light btn-lg text-dark fw-bold'>
            Go to Products Section
          </Link>
        </div>

        {/* Additional content */}
        <div className='text-center my-4'>
          <p className='lead'>
            Discover our various products designed with quality and functionality in mind. 
            Browse through our collections and find what suits your needs.
          </p>
          <p>
            Our mission is to provide you with the best inventory solutions, ensuring your 
            business thrives. Join us on this journey and explore the possibilities!
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className='text-center py-4 border-top bg-dark text-light'>
        <p>&copy; 2024 @mule. All rights reserved.</p>
      </footer>
    </div>
  );
}

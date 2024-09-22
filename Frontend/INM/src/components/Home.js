import React from 'react';

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
        <h2 className='text-center'>Go to Products Section.</h2>
        
        {/* Add some additional content */}
        <div className='text-center my-4'>
          <p>
            Welcome to our website! Explore our various products and find what suits your needs.
            Our products are designed with quality and functionality in mind. Browse through our 
            collections and discover what makes us stand out.
          </p>
        </div>
      </div>
      
      {/* Add a footer */}
      <footer className='text-center py-4 border-top'>
        <p>&copy; 2024 @mule. All rights reserved.</p>
      </footer>
    </div>
  );
}

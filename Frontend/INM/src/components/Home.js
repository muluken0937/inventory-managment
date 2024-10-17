import React from 'react'; 
import { Link } from 'react-router-dom'; 
import '../CSS/Home.css'; // Import custom CSS for styling

export default function Home() {
  return (
    <div className='home-container d-flex flex-column min-vh-100'>
      {/* Carousel in Background */}
      <div id="backgroundCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="download (1).jpg" className="d-block w-100" alt="First Slide" />
          </div>
          <div className="carousel-item">
            <img src="download (2).jpg" className="d-block w-100" alt="Second Slide" />
          </div>
          <div className="carousel-item">
            <img src="download.jpg" className="d-block w-100" alt="Third Slide" />
          </div>
          <div className="carousel-item">
            <img src="download (3).jpg" className="d-block w-100" alt="Fourth Slide" />
          </div>
          <div className="carousel-item">
            <img src="download (4).jpg" className="d-block w-100" alt="Fifth Slide" />
          </div>
        </div>
      </div>

      {/* Front Section (Text and Image) */}
      <div className='front-section d-flex align-items-center justify-content-center p-5'>
        <div className="overlay-content row text-center text-md-start" style={{ height: '100%' }}>
          {/* Text Content (Left side on larger screens) */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className='display-4 fw-bold'>Inventory Management</h2>
            <p className='lead'>
              Manage your inventory effortlessly with our intuitive platform designed for businesses of all sizes.
            </p>

            {/* Call to Action Button */}
            <Link to="/products" className='btn btn-primary btn-md fw-bold'>
              Get Started
            </Link>
          </div>
          
          {/* Image Content (Right side on larger screens) */}
          <div className="col-md-6 d-flex align-items-center" style={{ height: '100%' }}>
            <img src="istockphoto-1465188429-612x612.jpg" className="img-fluid rounded" alt="Inventory Illustration" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='text-center py-4 border-top bg-secondary text-light mt-auto'>
        <p>&copy; 2024 @mule. All rights reserved.</p>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import './About.css';

export default function About() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {  // Adjust the value based on when you want the button to appear
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="about-container">
      <video className="about-background-video" autoPlay muted loop>
        <source src="700_F_706644525_wAaYzbK2Io6VHBigzkWXZzNueehEpppH_ST.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <div className="about-image">
          <img src="240_F_783000046_dkIfbX1h7jUeGLFEPVFozAstL56l204L.jpg" alt="About" />
        </div>
        <p className="about-description">
          Welcome to our company. We are dedicated to providing the best services to our customers. 
          Our team is passionate about making a difference and achieving excellence in all that we do. 
          This section can include more information about your company's mission, values, and history.
        </p>
        <p className="about-description">
          Additional content can be added here. This text will continue to scroll if it exceeds the viewport height.
        </p>
      </div>
      {showScrollTop && (
        <button className="scroll-top-button" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}

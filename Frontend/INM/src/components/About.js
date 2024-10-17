import React, { useState, useEffect } from 'react';
import '../CSS/About.css';

export default function About() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
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
        <div className="about-description">
          <p>Welcome to our company. We are dedicated to providing the best services to our customers. Our team is passionate about making a difference and achieving excellence in all that we do.</p>
          <p>This section can include more information about your company's mission, values, and history. Additional content can be added here. This text will continue to scroll if it exceeds the viewport height.</p>
        </div>

        {/* Mission Section */}
        <div className="mission-section">
          <h2 className="section-title">Our Mission</h2>
          <div className="mission-content">
            <img src="download (6).jpg" alt="Mission" className="mission-image" />
            <p>Our mission is to empower businesses with innovative inventory management solutions that drive efficiency and growth.</p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="vision-section">
          <h2 className="section-title">Our Vision</h2>
          <div className="vision-content">
            <img src="download (7).jpg" alt="Vision" className="vision-image" />
            <p>Our vision is to be the leading provider of inventory management solutions, recognized for our commitment to quality and customer satisfaction.</p>
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button className="scroll-top-button" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}

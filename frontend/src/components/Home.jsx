import React from 'react';
import imageName from '../mainpage.jpg';

const Home = () => {
  return (
    <>
      <main>
        <section className="container">
          <div className="left-section">
            <h1>Travelling Alone?</h1>
            <p>Join RideShaw! Enjoy a comfortable, eco-friendly ride while saving money and making new friends. Discover the joy of shared travel today!</p>
            <div className="cta-buttons">
              {/* change location when pressed */}
              <button className="cta-button" onClick={(e)=>{window.location.href="/entry"; e.preventDefault(); }}>Book Your Ride Now</button>
              <button className="cta-button secondary"onClick={(e)=>{window.location.href="/entries"; e.preventDefault(); }}>Let's Go</button>
            </div>
          </div>
          <div className="right-section">
            <img src={imageName} alt="Rickshaw"/>
          </div>
        </section>

        <section className="features">
          <h2>Why Choose Us?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Affordable Rides</h3>
              <p>Save money with our competitive rates and enjoy budget-friendly travel options.</p>
            </div>
            <div className="feature-item">
              <h3>Eco-Friendly</h3>
              <p>Reduce your carbon footprint with our sustainable and green travel solutions.</p>
            </div>
            <div className="feature-item">
              <h3>Safe and Reliable</h3>
              <p>Travel with peace of mind knowing our services prioritize your safety and comfort.</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Riders Say</h2>
          <div className="testimonial-list">
            <div className="testimonial-item">
              <p>"A fantastic service! I saved money and met some great people along the way."</p>
              <span>- Alex</span>
            </div>
            <div className="testimonial-item">
              <p>"Reliable and eco-friendly. Highly recommend for anyone looking for affordable travel."</p>
              <span>- Jamie</span>
            </div>
            <div className="testimonial-item">
              <p>"The best way to get around the city. Comfortable and safe rides every time."</p>
              <span>- Taylor</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We are dedicated to making your daily commute more affordable and eco-friendly by providing a reliable rickshaw-sharing service. Connect with others and share the journey!</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#instagram">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 RideShaw. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;

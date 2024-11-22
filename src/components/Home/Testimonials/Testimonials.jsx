import React from "react";
import testimonialicon from "../../../assets/images/testimonial-icon.png";
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="center-heading">
              <h2 className="section-title">What Our Customers Say</h2>
            </div>
          </div>
          <div className="offset-lg-3 col-lg-6">
            <div className="center-text">
              <p>
                Discover how HealthSync is transforming insurance experiences with personalized, AI-powered solutions.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="team-item">
              <div className="team-content">
                <i>
                  <img src={testimonialicon} alt="Testimonial Icon" />
                </i>
                <p>
                  "HealthSync's AI-powered platform made selecting the right insurance plan effortless and efficient. Truly revolutionary!"
                </p>
                <div className="user-image">
                  <img src={testimonialicon} alt="User" />
                </div>
                <div className="team-info">
                  <h3 className="user-name">Lucas Mitchell</h3>
                  <span>Health Enthusiast</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="team-item">
              <div className="team-content">
                <i>
                  <img src={testimonialicon} alt="Testimonial Icon" />
                </i>
                <p>
                  "The fitness-based premium adjustments helped me save money while encouraging a healthier lifestyle. Highly recommended!"
                </p>
                <div className="user-image">
                  <img src={testimonialicon} alt="User" />
                </div>
                <div className="team-info">
                  <h3 className="user-name">Ava Thompson</h3>
                  <span>Entrepreneur</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="team-item">
              <div className="team-content">
                <i>
                  <img src={testimonialicon} alt="Testimonial Icon" />
                </i>
                <p>
                  "The real-time assistance from HealthSync's AI agents is a game-changer. I always feel supported and well-informed."
                </p>
                <div className="user-image">
                  <img src={testimonialicon} alt="User" />
                </div>
                <div className="team-info">
                  <h3 className="user-name">Isabella Parker</h3>
                  <span>Tech-Savvy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

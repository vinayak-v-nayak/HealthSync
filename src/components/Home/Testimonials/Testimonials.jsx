import React from "react";
import testimonialicon from "../../../assets/images/testimonial-icon.png";
import './Testimonials.css'

const Testimonials = () => {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="center-heading">
              <h2 className="section-title">Customer Reviews</h2>
            </div>
          </div> 
          <div className="offset-lg-3 col-lg-6">
            <div className="center-text">
              <p>
                Read what our valued customers have to say about their
                experience with Insurance Company.
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
                  "Insurance Company provided me with excellent service and
                  comprehensive coverage. I highly recommend them to anyone
                  looking for reliable insurance solutions."
                </p>
                <div className="user-image">
                  <img src={testimonialicon} alt="User" />
                </div>
                <div className="team-info">
                  <h3 className="user-name">John Doe</h3>
                  <span>Homeowner</span>
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
                  "I've been a customer of Insurance Company for years, and they
                  have always been responsive and helpful whenever I've needed
                  them. Great service!"
                </p>
                <div className="user-image">
                  <img src={testimonialicon} alt="User" />
                </div>
                <div className="team-info">
                  <h3 className="user-name">Jane Smith</h3>
                  <span>Business Owner</span>
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
                  "Insurance Company helped me find the perfect insurance plan
                  tailored to my needs and budget. I couldn't be happier with
                  their service."
                </p>
                <div className="user-image">
                  <img src={testimonialicon} alt="User" />
                </div>
                <div className="team-info">
                  <h3 className="user-name">Michael Johnson</h3>
                  <span>Parent</span>
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

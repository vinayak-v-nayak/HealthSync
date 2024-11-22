import React from 'react';
import './welcomeArea.css'

const WelcomeArea = () => {
  return (
    <div className="welcome-area" id="welcome">
      <div className="header-text">
        <div className="container">
          <div className="row">
            <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
              <h1>Protect Your Future with Our <br /> <strong>HealthSync</strong></h1>
              <p>Discover personalized insurance solutions designed to protect your future with peace of mind.</p>
              <a href="" className="main-button-slider">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeArea;

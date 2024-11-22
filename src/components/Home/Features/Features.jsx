import React from 'react';
import featureditem01 from '../../../assets/images/featured-item-01.png';
import './Features.css'

const Features = () => {
  return (
    <section className="section home-feature">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="features-small-item">
                  <div className="icon">
                    <i><img src={featureditem01} alt="Comprehensive Coverage" /></i>
                  </div>
                  <h5 className="features-title">Comprehensive Coverage</h5>
                  <p>Empowering users with tailored insurance plans that address their unique health needs, ensuring complete protection and peace of mind.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="features-small-item">
                  <div className="icon">
                    <i><img src={featureditem01} alt="Personalized Service" /></i>
                  </div>
                  <h5 className="features-title">Personalized Service</h5>
                  <p>Harness the power of AI to deliver personalized policy recommendations and health-risk assessments, helping you make smarter, informed decisions with ease.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="features-small-item">
                  <div className="icon">
                    <i><img src={featureditem01} alt="24/7 Support" /></i>
                  </div>
                  <h5 className="features-title">24/7 Support</h5>
                  <p>Experience unparalleled convenience with AI-powered virtual assistance, providing real-time guidance and instant updates, anytime, anywhere.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

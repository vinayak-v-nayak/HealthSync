import React from 'react';
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="#" className="logo">
                <img src={logo} alt="Insurance Company" style={{ width: '90px', height: '70px' }} />
              </a>
              <ul className="nav">
                <li><a href="#welcome" className="active">Home</a></li>
                <li><a href="#features">Insurance Services</a></li>
                <li><a href="#testimonials">Get Recommendations</a></li>
                <li><a href="#contact-us">Contact Us</a></li>
              </ul>
              <a className='menu-trigger'>
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

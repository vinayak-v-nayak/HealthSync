import React, { useState } from "react";
import logo from "../../assets/images/healthsynclogo.png";
import userImage from "../../assets/images/login.png"; // Placeholder user image
import { Link, useNavigate } from "react-router-dom";
import './header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const navigate = useNavigate();

  // Function to navigate to login page
  const handleLoginClick = () => {
    navigate("/profile");
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="header-content">
          <nav className="main-nav">
            <Link to="/" className="logo">
              <img
                src={logo}
                alt="Insurance Company"
                style={{
                  width: "90px",
                  height: "70px",
                  borderRadius: "20px",
                }}
              />
            </Link>
            {/* Mobile Menu Toggle Button */}
            <div className="menu-toggle" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>

            <ul className={`nav ${menuOpen ? "active" : ""}`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Insurance Services</Link>
              </li>
              <li>
                <Link to="/fitness">Fitness Score</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback</Link>
              </li>
              <div className="login-icon" onClick={handleLoginClick}>
                <img src={userImage} alt="User Icon" className="user-image" />
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

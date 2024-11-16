import React from "react";
import logo from "../../assets/images/healthsynclogo.png";
import userImage from "../../assets/images/login.png"; // Placeholder user image
import { Link, useNavigate } from "react-router-dom";
import './header.css'

const Header = () => {
  const navigate = useNavigate();

  // Function to navigate to login page
  const handleLoginClick = () => {
    navigate("/profile");
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
            <ul className="nav">
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
                <Link to="/user">User Details</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
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

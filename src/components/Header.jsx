import React from "react";
import logo from "../assets/images/healthsynclogo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="#" className="logo">
                <img
                  src={logo}
                  alt="Insurance Company"
                  style={{
                    width: "90px",
                    height: "70px",
                    borderRadius: "20px",
                  }}
                />
              </a>
              <ul className="nav">
                <li>
                  <Link to="/" className="active">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services">Insurance Services</Link>
                </li>
                <li>
                  <Link to="/fitness">Fitness Score</Link>
                </li>
                <li>
                  <Link to="/recommendation">Get Recommendations</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/ContactUs">Contact Us</Link>
                </li>
              </ul>
              <a className="menu-trigger">
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

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import logo from "../../assets/images/healthsynclogo.png";
import userImage from "../../assets/images/login.png"; // Placeholder user image
import './header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to track window width
  const navigate = useNavigate();

  // Function to navigate to profile page
  const handleLoginClick = () => {
    navigate("/profile");
  };

  // Function to toggle offcanvas menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Update windowWidth when window size changes
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive styles based on window width
  const navStyle = {
    display: windowWidth <= 768 ? (menuOpen ? 'block' : 'none') : 'flex',
    flexWrap: 'wrap',
  };

  const menuToggleStyle = {
    display: windowWidth <= 768 ? 'block' : 'none',
    cursor: 'pointer',
  };

  const barStyle = {
    display: 'block',
    width: '25px',
    height: '3px',
    backgroundColor: '#333',
    margin: '5px 0',
  };

  const logoImageStyle = {
    width: windowWidth <= 480 ? '50px' : windowWidth <= 768 ? '70px' : '90px',
    height: windowWidth <= 480 ? '40px' : windowWidth <= 768 ? '50px' : '70px',
    borderRadius: '20px',
    objectFit: 'cover',
    transition: 'all 0.3s ease',
  };

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <Navbar expand="lg" className="navbar-custom mb-3">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                src={logo}
                alt="HealthSync Logo"
                style={logoImageStyle}
              />
            </Navbar.Brand>
            {/* Mobile Menu Toggle Button */}
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={toggleMenu} />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              show={menuOpen}
              onHide={toggleMenu}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  HealthSync
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav style={navStyle} className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                  <Nav.Link as={Link} to="/services" className="nav-link">Insurance Services</Nav.Link>
                  <Nav.Link as={Link} to="/fitness" className="nav-link">Fitness Score</Nav.Link>
                  <Nav.Link as={Link} to="/blog" className="nav-link">Blog</Nav.Link>
                  <Nav.Link as={Link} to="/feedback" className="nav-link">Feedback</Nav.Link>
                </Nav>
                {/* Use the user image directly as the login icon */}
                <div className="login-icon" onClick={handleLoginClick}>
                  <img src={userImage} alt="User Icon" className="user-image" />
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;

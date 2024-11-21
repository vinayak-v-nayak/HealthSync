import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './login.css'; // Ensure you include the necessary CSS
const baseUrl = process.env.REACT_APP_API_URL;

const Auth = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('login'); // Default to login

  // Check if the user is already authenticated
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/'); // If token exists, navigate to home page or dashboard
    }
  }, [navigate]);

  // Helper function to set cookies
  const setAuthCookies = (token, user) => {
    Cookies.set('token', token, { expires: 7, path: '/', sameSite: 'Lax' });
    Cookies.set('user', JSON.stringify(user), { expires: 7, path: '/', sameSite: 'Lax' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setAuthCookies(data.token, data.user);
        setSuccess('Login successful!');
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthCookies(data.token, data.user);
        setSuccess('Signup successful! Redirecting...');
        setTimeout(() => navigate('/userform'), 3000); // Redirect to profile form after 3 seconds
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 auth-container">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </MDBCol>
        <MDBCol col="4" md="6">
          <h2 className="auth-title">Welcome</h2>

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Enter your email address"
                id="emailInput"
                type="email"
                size="lg"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Enter your password"
                id="passwordInput"
                type="password"
                size="lg"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="Remember me" />
                <a href="#!">Forgot password?</a>
              </div>
              <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                Sign in
              </MDBBtn>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <p className="ms-5">
                Don't have an account?{' '}
                <a href="#!" className="link-info" onClick={() => setActiveTab('signup')}>
                  Register here
                </a>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="auth-form">
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Enter your full name"
                id="nameInput"
                type="text"
                size="lg"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Enter your email address"
                id="emailSignupInput"
                type="email"
                size="lg"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Enter your password"
                id="passwordSignupInput"
                type="password"
                size="lg"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Confirm your password"
                id="confirmPasswordInput"
                type="password"
                size="lg"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                required
              />
              <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                Sign Up
              </MDBBtn>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <p className="ms-5">
                Already have an account?{' '}
                <a href="#!" className="link-info" onClick={() => setActiveTab('login')}>
                  Login here
                </a>
              </p>
            </form>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Auth;

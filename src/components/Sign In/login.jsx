import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css'; // Ensure to include your CSS file

const Auth = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  // Fetch user data if logged in
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token'); // Get token from cookies
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Send the token for authentication
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for cookie management
          });

          const data = await response.json();
          if (response.ok) {
            navigate('/profile'); // Redirect to profile page if logged in
          } else {
            setError(data.message || 'Failed to fetch user data');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Something went wrong while fetching user data');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include', // Important for cookie management
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('token', data.token, { expires: 7, path: '/', sameSite: 'Lax' });
        Cookies.set('user', JSON.stringify(data.user), { expires: 7, path: '/', sameSite: 'Lax' });
        setSuccess('Login successful!');
        navigate('/profile'); // Redirect to profile page after successful login
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
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Signup successful! Please login.');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome</h2>
        <div>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Signup
            </button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <button type="submit" className="auth-button">Login</button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="auth-form">
              <input
                type="text"
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                required
              />
              <button type="submit" className="auth-button">Sign Up</button>
            </form>
          )}

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
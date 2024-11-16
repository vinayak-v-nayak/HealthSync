// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get('token'); // Assuming the token is stored in cookies

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, allow access to the page
  return children;
};

export default PrivateRoute;

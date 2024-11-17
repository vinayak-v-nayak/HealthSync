import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedPage = ({ children }) => {
  const [isFormCompleted, setIsFormCompleted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors
  const token = Cookies.get('token'); // Get token from cookies
  const userId = Cookies.get('user'); // Get user data from cookies

  useEffect(() => {
    const checkUserFormStatus = async () => {
      if (!token || !userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/check-form-status', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch form status');
        }

        const data = await response.json();

        // Use the correct key for form completion status based on your API response
        if (data.userFormCompleted) {
          setIsFormCompleted(true);
        } else {
          setIsFormCompleted(false);
        }
      } catch (error) {
        console.error('Error fetching user form status:', error);
        setError('Unable to verify form completion status.');
        setIsFormCompleted(false); // Consider the form incomplete in case of error
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      checkUserFormStatus();
    } else {
      setLoading(false);
    }
  }, [token, userId]);

  // While loading, show a spinner or loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no token or userId, redirect to the login page
  if (!token || !userId) {
    return <Navigate to="/login" />;
  }

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // If the user is logged in but the form is not completed, redirect to the form
  if (isFormCompleted === false) {
    return <Navigate to="/userform" />;
  }

  // If the user is logged in and the form is completed, show the protected content
  return children;
};

export default ProtectedPage;

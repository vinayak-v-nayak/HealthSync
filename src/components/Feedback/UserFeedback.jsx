import React, { useState } from 'react';
import './UserFeedback.css';
import Cookies from 'js-cookie';  

const UserFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setError('Feedback is required.');  
      return;
    }

    const token = Cookies.get('token');  

    if (!token) {
      alert('Authentication token is missing.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  
        },
        body: JSON.stringify({ feedback, rating }), 
        credentials: 'include',
      });

      if (response.ok) {
        alert('Feedback submitted successfully!');
        setFeedback('');
        setRating(0);
        setError('');  
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting your feedback.');
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Share Your Thoughts</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            className="feedback-input"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what's on your mind"
            rows="4"
          ></textarea>
          {error && <p className="error-message">{error}</p>}  
        </div>
        <div className="form-group">
          <label>Your Rating</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default UserFeedback;

import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import './FitnessScore.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const FitnessScore = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    exerciseMinutes: '',
    heartRate: '',
    stepsPerDay: ''
  });
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/api/fitness-score', { withCredentials: true });
          if (response.data) {
            setFormData(response.data);
            calculateScore(response.data); // Pre-calculate score for existing data
          }
        } catch (error) {
          console.log('No existing data or user not logged in', error);
        }    
      }
    };
    fetchData();
  }, []);

  const calculateScore = (data = formData) => {
    const heightInMeters = parseFloat(data.height) / 100;
    const weight = parseFloat(data.weight);
    const bmi = weight / (heightInMeters * heightInMeters);

    let totalScore = 50;

    if (bmi >= 18.5 && bmi <= 24.9) {
      totalScore += 12.5;
    } else if (bmi >= 25 && bmi <= 29.9) {
      totalScore += 7.5;
    } else if (bmi >= 30) {
      totalScore += 2.5;
    }

    const exerciseMinutes = parseInt(data.exerciseMinutes);
    if (exerciseMinutes >= 150) {
      totalScore += 12.5;
    } else if (exerciseMinutes >= 75) {
      totalScore += 7.5;
    } else {
      totalScore += 2.5;
    }

    const heartRate = parseInt(data.heartRate);
    if (heartRate >= 60 && heartRate <= 100) {
      totalScore += 12.5;
    } else {
      totalScore += 5;
    }

    const steps = parseInt(data.stepsPerDay);
    if (steps >= 10000) {
      totalScore += 12.5;
    } else if (steps >= 7500) {
      totalScore += 7.5;
    } else if (steps >= 5000) {
      totalScore += 5;
    }

    setScore(totalScore);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    calculateScore();

    const token = Cookies.get('token');
    if (token) {
      const confirmSave = window.confirm('Do you want to save your fitness data?');
      
      if (confirmSave) {
        try {
          const response = await axios.post('http://localhost:3000/api/fitness-score', formData, { 
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}` // Include token if your API requires it
            }
          });
          
          if (response.data) {
            alert('Fitness data saved successfully');
          }
        } catch (error) {
          console.error('Error details:', error.response.data); // Log error details
          alert('Error saving data: ' + (error.response?.data?.message || 'An unknown error occurred'));
        }
      }
    }
  };

  return (
    <div className="fitness-container">
      <div className="fitness-card">
        <h1 className="fitness-title">Fitness Score Calculator</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="fitness-form">
          {/* Input Fields */}
          <div className="input-group">
            <label className="input-label">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your age"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your weight"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your height"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Exercise Minutes per Week</label>
            <input
              type="number"
              name="exerciseMinutes"
              value={formData.exerciseMinutes}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Minutes of exercise per week"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Heart Rate (bpm)</label>
            <input
              type="number"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your heart rate"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Steps per Day</label>
            <input
              type="number"
              name="stepsPerDay"
              value={formData.stepsPerDay}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Steps per day"
              required
            />
          </div>

          <button onClick={handleSubmit} className="calculate-button">
            <Calculator />
            {score !== null ? 'Calculate Score' : 'Calculate Score'}
          </button>

          {score !== null && (
            <div className="results-container">
              <div className="result-card score-card">
                <h3 className="result-title">Your Fitness Score</h3>
                <p className="result-value">{score} / 100</p>
                <p className="result-label">
                  {score >= 80 ? 'Excellent' :
                   score >= 70 ? 'Very Good' :
                   score >= 60 ? 'Good' :
                   score >= 50 ? 'Fair' : 'Needs Improvement'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitnessScore;

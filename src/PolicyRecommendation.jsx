import React, { useState } from 'react';
import './assets/css/PolicyRecommendation.css'; // Import the CSS file for styling

const PolicyRecommendation = () => {
  const [formData, setFormData] = useState({
    age: '',
    location: '',
    coverage: ''
  });

  const [recommendedPolicy, setRecommendedPolicy] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Placeholder for policy recommendation logic
    // Here, you might want to send the form data to a backend or use a third-party API to get recommendations
    const policy = await getPolicyRecommendation(formData); // Simulating API call
    setRecommendedPolicy(policy);
  };

  // Simulating an API call to get a recommended policy
  const getPolicyRecommendation = async (formData) => {
    // Logic to recommend a policy can be added here, for now, we're returning a mock recommendation
    return {
      name: 'Comprehensive Health Plan',
      description: 'A comprehensive health insurance policy for individuals.',
      premium: '$200/month',
      coverageDetails: 'Covers hospitalization, outpatient care, maternity, and more.'
    };
  };

  return (
    <div className="policy-recommendation">
      <h2>Get Policy Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverage">Coverage Needs</label>
          <select
            id="coverage"
            name="coverage"
            value={formData.coverage}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Coverage</option>
            <option value="basic">Basic</option>
            <option value="comprehensive">Comprehensive</option>
            <option value="family">Family</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Get Recommendation</button>
      </form>

      {recommendedPolicy && (
        <div className="recommended-policy">
          <h3>Recommended Policy: {recommendedPolicy.name}</h3>
          <p>{recommendedPolicy.description}</p>
          <p><strong>Premium:</strong> {recommendedPolicy.premium}</p>
          <p><strong>Coverage Details:</strong> {recommendedPolicy.coverageDetails}</p>
        </div>
      )}
    </div>
  );
};

export default PolicyRecommendation;

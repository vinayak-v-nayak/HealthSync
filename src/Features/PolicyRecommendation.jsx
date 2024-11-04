import React, { useState } from "react";
import "../assets/css/PolicyRecommendation.css"; // Import the CSS file for styling

const PolicyRecommendation = () => {
  const [formData, setFormData] = useState({
    age: "",
    location: "",
    salary: "",
    fitnessScore: "",
    coverage: "",
    premiumLevel: "",
    insuranceType: "",
    maritalStatus: "",
    comments: "",
  });

  const [recommendedPolicy, setRecommendedPolicy] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Placeholder for policy recommendation logic
    const policy = await getPolicyRecommendation(formData); // Simulating API call
    setRecommendedPolicy(policy);
  };

  // Simulating an API call to get a recommended policy
  const getPolicyRecommendation = async (formData) => {
    // Logic to recommend a policy can be added here
    return {
      name: "Tailored Insurance Plan",
      description:
        "An insurance plan tailored to your needs based on the provided details.",
      premium: "$250/month",
      coverageDetails: "Covers a variety of needs based on your preferences.",
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
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fitnessScore">Fitness Score</label>
          <input
            type="number"
            id="fitnessScore"
            name="fitnessScore"
            value={formData.fitnessScore}
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
        <div className="form-group">
          <label htmlFor="premiumLevel">Premium Level</label>
          <select
            id="premiumLevel"
            name="premiumLevel"
            value={formData.premiumLevel}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Premium Level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="insuranceType">Type of Insurance</label>
          <select
            id="insuranceType"
            name="insuranceType"
            value={formData.insuranceType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Insurance Type</option>
            <option value="health">Health</option>
            <option value="life">Life</option>
            <option value="auto">Auto</option>
            <option value="home">Home</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="maritalStatus">Marital Status</label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Additional Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows="4"
          />
        </div>
        <button type="submit" className="submit-btn">
          Get Recommendation
        </button>
      </form>

      {recommendedPolicy && (
        <div className="recommended-policy">
          <h3>Recommended Policy: {recommendedPolicy.name}</h3>
          <p>{recommendedPolicy.description}</p>
          <p>
            <strong>Premium:</strong> {recommendedPolicy.premium}
          </p>
          <p>
            <strong>Coverage Details:</strong>{" "}
            {recommendedPolicy.coverageDetails}
          </p>
        </div>
      )}
    </div>
  );
};

export default PolicyRecommendation;

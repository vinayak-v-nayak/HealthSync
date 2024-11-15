import React, { useState, useEffect } from 'react';
import InsuranceCard from '../components/InsuranceCard'; // Assuming you have this component
import { Link } from 'react-router-dom'; // Link to navigate to General Policies page

const RecommendedPolicies = () => {
  const [recommendedPolicies, setRecommendedPolicies] = useState([]);

  // Fetch recommended policies for the current user
  const fetchRecommendedPolicies = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/policies/recommendations');
      const data = await response.json();
      setRecommendedPolicies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching recommended policies:', error);
    }
  };

  useEffect(() => {
    fetchRecommendedPolicies(); // Fetch recommended policies when the page is loaded
  }, []);

  return (
    <div className="recommended-policies max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Recommended Insurance Policies</h2>

      {/* Display Recommended Policies */}
      <div className="space-y-4">
        {recommendedPolicies.length > 0 ? (
          recommendedPolicies.map((policy) => (
            <InsuranceCard key={policy._id} policy={policy} />
          ))
        ) : (
          <p>No recommended policies available.</p>
        )}
      </div>

      {/* Link to General Policies page */}
      <div className="mt-8">
        <Link to="/general" className="text-blue-500">See All Policies</Link>
      </div>
    </div>
  );
};

export default RecommendedPolicies;

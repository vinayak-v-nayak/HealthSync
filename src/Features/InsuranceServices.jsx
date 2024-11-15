import React, { useState, useEffect } from 'react';  
import InsuranceCard from '../components/InsuranceCard';
import '../assets/css/card.css';
import '../assets/css/InsuranceServices.css';

const InsuranceServices = () => {
  const [policies, setPolicies] = useState([]);
  const [brand, setBrand] = useState('');
  const [coverage, setCoverage] = useState('');
  const [brands, setBrands] = useState([]);
  const [coverages, setCoverages] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showingRecommendations, setShowingRecommendations] = useState(false);

  // Fetch policies based on filters; if no filters, fetch all policies
  const fetchPolicies = async () => {
    try {
      let url = 'http://localhost:3000/api/policies';
      if (brand || coverage) {
        url += `?${brand ? `brandName=${brand}&` : ''}${coverage ? `coverageAmount=${coverage}` : ''}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setPolicies(Array.isArray(data) ? data : []);  // Ensure it's an array
      setShowingRecommendations(false);
    } catch (error) {
      console.error('Error fetching policies:', error);
      setPolicies([]);  // Set empty array if an error occurs
    }
  };

  // Fetch available brands and coverages for filter dropdowns
  const fetchFilters = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/policies/filters');
      const data = await response.json();
      setBrands(data.brandNames || []);
      setCoverages(data.coverageAmounts || []);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  // Fetch recommendations based on fitness score and salary
  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/policies/recommendations');
      const data = await response.json();
      setRecommendations(Array.isArray(data) ? data.slice(0, 10) : []);  // Limit to 10 recommendations
      setShowingRecommendations(true);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]);  // Set empty array if an error occurs
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchRecommendations(); // Fetch initial recommendations
  }, []);

  useEffect(() => {
    fetchPolicies(); // Fetch filtered policies whenever brand or coverage changes
  }, [brand, coverage]);

  return (
    <div className="insurance-services max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {showingRecommendations ? recommendations.length : policies.length} Plans found
        </h2>
        <p className="text-gray-600">All prices are inclusive of GST</p>
      </div>

      {/* Dropdown Filters */}
      <div className="flex space-x-4 mb-4">
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <select value={coverage} onChange={(e) => setCoverage(e.target.value)} className="p-2 border border-gray-300 rounded">
          <option value="">Select Coverage</option>
          {coverages.map((coverage) => (
            <option key={coverage} value={coverage}>{coverage}</option>
          ))}
        </select>

        {/* Button to show recommended policies */}
        <button 
          onClick={fetchRecommendations} 
          className="p-2 bg-blue-500 text-white rounded"
        >
          Show Recommended Policies
        </button>
      </div>

      {/* Insurance Policies Display */}
      <div className="space-y-4">
        {(showingRecommendations ? recommendations : policies).map((policy) => (
          <InsuranceCard key={policy._id} policy={policy} />
        ))}
      </div>
    </div>
  );
};

export default InsuranceServices;

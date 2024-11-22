import React, { useState, useEffect } from 'react';
import InsuranceCard from '../InsuranceCard/InsuranceCard';
import './InsuranceServices.css';
import Cookies from 'js-cookie'; // For reading cookies

const baseUrl = process.env.REACT_APP_API_URL;

const InsuranceServices = () => {
  const [policies, setPolicies] = useState([]); 
  const [recommendations, setRecommendations] = useState([]); 
  const [brands, setBrands] = useState([]); 
  const [coverages, setCoverages] = useState([]); 
  const [activeSection, setActiveSection] = useState('general'); 
  const [selectedPolicies, setSelectedPolicies] = useState([]); 
  const [brandFilter, setBrandFilter] = useState(''); 
  const [coverageFilter, setCoverageFilter] = useState(''); 

  // Fetch all policies (no filter)
  const fetchPolicies = async () => {
    try {
      let url = `${baseUrl}/api/policies`;
      if (brandFilter || coverageFilter) {
        url += `?${brandFilter ? `brandName=${brandFilter}&` : ''}${coverageFilter ? `coverageAmount=${coverageFilter}` : ''}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      console.error('Error fetching policies:', error);
      setPolicies([]);
    }
  };

  // Fetch user recommendations based on token (GET request, no fitness score)
  const fetchRecommendations = async () => {
    try {
      const token = Cookies.get('token'); // Get the token from cookies
      if (!token) {
        alert('Token not found in cookies. Please log in.');
        return;
      }

      // Send the token in the Authorization header to the backend
      const recommendationResponse = await fetch(`${baseUrl}/api/policies/recommendations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token to authenticate the user
        },
      });

      const recommendationData = await recommendationResponse.json();

      // Check if recommendations are available
      if (Array.isArray(recommendationData)) {
        setRecommendations(recommendationData);  // Set the recommendations
      } else {
        console.error('Invalid recommendations format:', recommendationData);
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]);
    }
  };

  // Fetch available brands and coverages for filter dropdowns
  const fetchFilters = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/policies/filters`);
      const data = await response.json();
      setBrands(data.brandNames || []);
      setCoverages(data.coverageAmounts || []);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  // Fetch all data initially
  useEffect(() => {
    fetchPolicies();
    fetchFilters();
    fetchRecommendations();  // Fetch recommendations based on token
  }, [brandFilter, coverageFilter]);  // Fetch policies and recommendations whenever filters change

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handlePolicySelection = (policyId) => {
    setSelectedPolicies((prev) => {
      if (prev.includes(policyId)) {
        return prev.filter(id => id !== policyId);
      }
      return [...prev, policyId];
    });
  };
  const formatCoverageAmount = (amount) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(1)}Cr`; // Convert to Crores
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}Lac`; // Convert to Lakhs
    } else {
      return amount; // Display as is for smaller amounts
    }
  };
  
  return (
    <div className="insurance-services max-w-6xl mx-auto p-4">
      {/* Navbar */}
      <div className="navbar mb-8">
        <ul>
          <li 
            className={`cursor-pointer ${activeSection === 'general' ? 'font-bold' : ''}`}
            onClick={() => handleSectionChange('general')}
          >
            General Policies
          </li>
          <li 
            className={`cursor-pointer ${activeSection === 'recommended' ? 'font-bold' : ''}`}
            onClick={() => handleSectionChange('recommended')}
          >
            Recommended Policies
          </li>
        </ul>
      </div>

      {/* General Policies Section */}
      {activeSection === 'general' && (
        <div className="selectable-policies">
          {/* Filter Section */}
          <div className="filters mb-4">
            <div className="flex space-x-4">
              <select 
                value={brandFilter} 
                onChange={(e) => setBrandFilter(e.target.value)} 
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select 
                value={coverageFilter} 
                onChange={(e) => setCoverageFilter(e.target.value)} 
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Select Coverage</option>
                {coverages.map((coverage) => (
                  <option key={coverage} value={coverage}>{formatCoverageAmount(coverage)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Display filtered policies */}
          <div className="space-y-4">
            {policies.slice().map((policy) => (
              <InsuranceCard 
                key={policy._id} 
                policy={policy} 
                onSelect={handlePolicySelection} 
                isSelected={selectedPolicies.includes(policy._id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recommended Policies Section */}
      {activeSection === 'recommended' && (
        <div className="recommended-policies mt-8">
          <h3>Recommended Policies</h3>
          <div className="space-y-4">
            {recommendations.slice(0, 15).map((policy) => (
              <InsuranceCard 
                key={policy._id} 
                policy={policy} 
                onSelect={handlePolicySelection} 
                isSelected={selectedPolicies.includes(policy._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceServices;

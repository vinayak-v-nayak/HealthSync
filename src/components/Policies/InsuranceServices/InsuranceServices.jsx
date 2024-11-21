import React, { useState, useEffect } from 'react';
import InsuranceCard from '../InsuranceCard/InsuranceCard';
import './InsuranceServices.css';
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

  // Fetch random recommendations (10-15 policies)
  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/policies/recommendations`);
      const data = await response.json();
      setRecommendations(data);  // Limit to 10-15 recommendations
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
    fetchRecommendations();
    fetchFilters();
  }, [brandFilter, coverageFilter]);  // Fetch policies whenever filters change

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
                  <option key={coverage} value={coverage}>{coverage}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Display filtered policies */}
          <div className="space-y-4">
            {policies.slice(0, 15).map((policy) => (
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

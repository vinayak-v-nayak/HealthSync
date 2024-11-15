import React, { useState, useEffect } from 'react';
import InsuranceCard from '../components/InsuranceCard'; // Assuming you have this component
import { Link } from 'react-router-dom'; // Link to navigate to Recommended Policies page

const GeneralPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [brand, setBrand] = useState('');
  const [coverage, setCoverage] = useState('');
  const [brands, setBrands] = useState([]);
  const [coverages, setCoverages] = useState([]);

  // Fetch all policies based on the selected filters
  const fetchPolicies = async () => {
    try {
      let url = 'http://localhost:3000/api/policies';
      if (brand || coverage) {
        url += `?${brand ? `brandName=${brand}&` : ''}${coverage ? `coverageAmount=${coverage}` : ''}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setPolicies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };

  // Fetch available brands and coverage amounts for filtering
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

  useEffect(() => {
    fetchFilters();
    fetchPolicies(); // Fetch policies initially
  }, []);

  useEffect(() => {
    fetchPolicies(); // Fetch filtered policies when brand or coverage changes
  }, [brand, coverage]);

  return (
    <div className="general-policies max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">General Insurance Policies</h2>

      {/* Filter Dropdowns */}
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
      </div>

      {/* Display Policies */}
      <div className="space-y-4">
        {policies.length > 0 ? (
          policies.map((policy) => (
            <InsuranceCard key={policy._id} policy={policy} />
          ))
        ) : (
          <p>No policies found for the selected filters.</p>
        )}
      </div>

      {/* Link to Recommended Policies page */}
      <div className="mt-8">
        <Link to="/" className="text-blue-500">Back to Recommended Policies</Link>
      </div>
    </div>
  );
};

export default GeneralPolicies;

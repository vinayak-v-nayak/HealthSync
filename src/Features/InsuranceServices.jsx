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

  // Fetch policies based on filters; if no filters, fetch all policies
  const fetchPolicies = async () => {
    console.log('Fetching policies with:', { brand, coverage }); // Debugging line
    try {
      let url = 'http://localhost:3000/api/policies';
      if (brand || coverage) {
        url += `?${brand ? `brandName=${brand}&` : ''}${coverage ? `coverageAmount=${coverage}` : ''}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched policies:', data); // Debugging line
      setPolicies(data);
    } catch (error) {
      console.error('Error fetching policies:', error);
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

  useEffect(() => {
    fetchFilters();
    fetchPolicies(); // Fetch all policies initially
  }, []);

  useEffect(() => {
    fetchPolicies(); // Fetch filtered policies whenever brand or coverage changes
  }, [brand, coverage]);

  return (
    <div className="insurance-services max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{policies.length} Plans found</h2>
        <p className="text-gray-600">All prices are inclusive of GST</p>
      </div>

      {/* Dropdown Filters */}
      <div className="flex space-x-4 mb-4" >
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="p-2 border border-gray-300 rounded ">
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

      {/* Insurance Policies Display */}
      <div className="space-y-4">
        {policies.map((policy) => (
          <InsuranceCard key={policy._id} policy={policy} />
        ))}
      </div>
    </div>
  );
};

export default InsuranceServices;

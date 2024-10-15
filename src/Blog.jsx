import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/assets/css/blog.css'

const InsurancePolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Fetch the index of all posts
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('https://www.healthcare.gov/api/index.json');
        setPolicies(response.data);
      } catch (error) {
        console.error('Error fetching insurance policies:', error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <div>
      <h1>Insurance Policies</h1>
      <ul>
        {policies.map(policy => (
          <li key={policy.url}>
            <a href={policy.url} target="_blank" rel="noopener noreferrer">{policy.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsurancePolicies;

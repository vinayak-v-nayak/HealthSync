import React from 'react';
import './InsuranceCard.css';
import img from '../../../assets/images/shield-icon.jpeg';

// Utility function to format coverage amount
const formatCoverageAmount = (amount) => {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(1)}Cr`; // Convert to Crores
  } else if (amount >= 100000) {
    return `${(amount / 100000).toFixed(1)}Lac`; // Convert to Lakhs
  } else {
    return amount; // Display as is for smaller amounts
  }
};

const InsuranceCard = ({ policy, onSelect, isSelected }) => {
  return (
    <div className="insurance-card">
      <div className="card-header">
        <img src={img} alt="icon" className="icon" />
        <div className="card-header-text">
          {/* Hyperlink for the Brand Name */}
          <h3 className="brand-name">
            <a href={policy.Policy_URL} target="_blank" rel="noopener noreferrer">
              {policy.Brand_Name}
            </a>
          </h3>
          <p className="policy-description">{policy.Policy_Name}</p>
        </div>
      </div>

      <div className="card-body">
        <div className="claim-settlement">
          <span>💼 {policy.Claim_Settlement_Ratio}% claim settlement ratio</span>
        </div>
        <div className="cashless-hospitals">
          <span>CASHLESS HOSPITALS</span>
          <span className="value">{policy.Cashless_Hospitals}</span>
        </div>
        <div className="coverage">
          <span>COVER</span>
          <span className="value">₹{formatCoverageAmount(policy.Coverage_Amount)}</span>
        </div>
        <div className="premium">
          <span className="monthly-premium">₹{policy.Monthly_Premium}/month</span>
          <span className="annual-premium">₹{policy.Annual_Premium}/ Year</span>
        </div>

        {/* View Details Button */}
        <div className="view-details" style={{ gridColumn: '4 / 5', justifySelf: 'end' }}>
          <button onClick={() => window.open(policy.Policy_URL, '_blank')} className="view-details-button" style={{ width: '120px' }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCard;

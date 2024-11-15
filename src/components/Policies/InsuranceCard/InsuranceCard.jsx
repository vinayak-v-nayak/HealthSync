// InsuranceCard.js
import React from 'react';
import './card.css';
import img from '../../../assets/images/shield-icon.jpeg'

const InsuranceCard = ({ policy }) => {
  return (
    <div className="insurance-card">
      <div className="card-header">
        <img src={img} alt="icon" className="icon" />
        <div className="card-header-text">
          <h3 className="brand-name">{policy.Brand_Name}</h3>
          <p className="policy-description">{policy.Policy_Name}</p>
        </div>
      </div>

      <div className="card-body">
        <div className="claim-settlement">
          <span>💼 {policy.Claim_Settlement_Ratio} claim settlement ratio</span>
        </div>
        <div className="cashless-hospitals">
          <span>CASHLESS HOSPITALS</span>
          <span className="value">{policy.Cashless_Hospitals}</span>
        </div>
        <div className="coverage">
          <span>COVER</span>
          <span className="value">{policy.Coverage_Amount}</span>
        </div>
        <div className="premium">
          <span className="monthly-premium">{policy.Monthly_Premium}</span>
          <span className="annual-premium">{policy.Annual_Premium}</span>
        </div>
        <div className="compare-option">
          <input type="checkbox" id={`compare-${policy._id}`} />
          <label htmlFor={`compare-${policy._id}`}>Add to Compare</label>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCard;

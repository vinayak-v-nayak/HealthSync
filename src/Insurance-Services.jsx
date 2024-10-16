import React from 'react';
import './assets/css/insurance.css'; // Add your styles here

const InsuranceServices = () => {
  const services = [
    {
      name: "Comprehensive Health Insurance",
      description: "Provides coverage for a wide range of medical expenses including hospitalization, outpatient care, and maternity services.",
      coverage: "Hospitalization, Outpatient, Maternity, Emergency Services"
    },
    {
      name: "Life Insurance",
      description: "Offers financial protection to your loved ones in the event of your untimely demise.",
      coverage: "Death benefits, Accidental death, Critical illness"
    },
    {
      name: "Auto Insurance",
      description: "Covers damages to your vehicle in case of accidents, theft, or natural disasters.",
      coverage: "Collision, Comprehensive, Personal Injury Protection"
    },
    {
      name: "Travel Insurance",
      description: "Provides coverage for unforeseen expenses during travel such as medical emergencies, trip cancellations, and lost baggage.",
      coverage: "Medical emergencies, Trip cancellation, Lost baggage"
    },
    {
      name: "Home Insurance",
      description: "Covers damages to your home due to natural disasters, fire, or burglary.",
      coverage: "Property damage, Fire, Burglary, Liability protection"
    }
  ];

  return (
    <div className="insurance-services">
      <h2>Insurance Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <strong>Coverage:</strong> {service.coverage}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceServices;

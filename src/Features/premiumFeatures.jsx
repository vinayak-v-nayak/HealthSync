import React, { useState } from 'react';

const PremiumFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
  };

  const features = [
    {
      id: ':rmf:',
      label: '2+ Hours Admission',
      description: 'Cover up to Sum Insured with no room type capping.',
      icon: '/svgs/get-quote/2 hr Hospitalization 50X50.svg',
    },
    {
      id: ':rmg:',
      label: 'All Day Care Treatment',
      description: 'Covered up to Sum Insured',
      icon: '/svgs/get-quote/Day Care Treatment 50X50.svg',
    },
    {
      id: ':rmh:',
      label: 'Modern Treatments',
      description: 'Covered up to Sum Insured with No Sub-Limits.',
      icon: '/svgs/get-quote/Modern Treatment 50X50.svg',
    },
    {
      id: ':rmi:',
      label: 'Booster+',
      description: 'Unutilised Base and M-iracle Sum Insured carries forward to the next policy year, as per your entry age.',
      icon: '/svgs/get-quote/Booster+ 50X50.svg',
    },
    {
      id: ':rmj:',
      label: 'Lock the Clock+',
      description: 'Pay the premium as per your entry age, till a claim is paid.',
      icon: '/svgs/get-quote/Lock the Clock 50X50.svg',
    },
    {
      id: ':rmk:',
      label: 'Road and Air Ambulance',
      description: 'Expenses in reaching a Hospital are covered up to Sum Insured.',
      icon: '/svgs/get-quote/Ambulance 50X50.svg',
    },
    {
      id: ':rml:',
      label: 'Expenses Before and After a Hospitalization',
      description: '60 Days and 180 Days Respectively. Covered up to Sum Insured.',
      icon: '/svgs/get-quote/Pre & Post Hospitalization 50X50.svg',
    },
    {
      id: ':rmm:',
      label: 'Home Care Treatments',
      description: 'Get Treatment at Home. Covered up to Sum Insured.',
      icon: '/svgs/get-quote/Homecare Treatment 50X50.svg',
    },
    {
      id: ':rmn:',
      label: 'Annual Health Check-Up',
      description: 'Covered from Day 1 for a defined list of tests on cashless basis.',
      icon: '/svgs/get-quote/Annual Health Checkup 50X50.svg',
    },
    {
      id: ':rmo:',
      label: 'E-Consultation',
      description: 'Unlimited e-consultation within our network.',
      icon: '/svgs/get-quote/E-Consultations 50X50.svg',
    },
    {
      id: ':rmp:',
      label: 'Live Healthy',
      description: 'Up to 30% Discount on premium at the time of renewal basis step count.',
      icon: '/svgs/get-quote/Live Healthy 50X50.svg',
    },
    {
      id: ':rmq:',
      label: 'Cashless Facility',
      description: '30 minutes cashless claim processing facility.',
      icon: '/svgs/get-quote/Cashless 50X50.svg',
    },
  ];

  return (
    <div id="premium-features" role="radiogroup" aria-labelledby="premium-features-label">
      <label className="text-lg font-bold text-nivabupa-blue-dark" id="premium-features-label" role="none">
        Premium Features
      </label>
      <div className="flex flex-wrap xs:gap-8 gap-3 mt-4" role="none">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col gap-2 cursor-pointer xs:w-[150px] w-[120px] ${selectedFeature === feature.id ? 'bg-blue-100' : ''}`}
            onClick={() => handleFeatureSelect(feature.id)}
            role="radio"
            aria-checked={selectedFeature === feature.id ? 'true' : 'false'}
            tabIndex="0"
          >
            <img
              alt={feature.label}
              loading="lazy"
              width="40"
              height="40"
              decoding="async"
              src={feature.icon}
              style={{ color: 'transparent' }}
            />
            <div className="text-sm font-semibold">{feature.label}</div>
            {selectedFeature === feature.id && (
              <div className="text-xs ui-checked:block">{feature.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumFeatures;

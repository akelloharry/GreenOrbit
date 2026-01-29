/**
 * Premiums & Subscription Tiers Panel
 * Shows subscription cost per hectare and available tiers
 */

import React from 'react';

const TIERS = [
  { name: 'Basic', price: 500, features: ['Early warning alerts', 'Basic map view', 'Pest risk summary'] },
  { name: 'Standard', price: 1000, features: ['All Basic features', 'Indicators panel', 'Farm-specific advice', 'SMS alerts'] },
  { name: 'Premium', price: 2000, features: ['All Standard features', 'Advanced analytics', 'Priority support', 'Custom reports'] },
];

const PremiumsPanel = () => (
  <div className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Premiums & Subscription Tiers</h2>
    <p className="text-gray-700 mb-4">Subscription is per hectare. Choose a tier that fits your needs:</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TIERS.map((tier, idx) => (
        <div key={idx} className="border rounded-lg p-4">
          <h3 className="font-bold text-lg text-blue-700 mb-2">{tier.name}</h3>
          <p className="text-green-700 font-bold mb-2">KES {tier.price} / hectare</p>
          <ul className="text-sm text-gray-600 mb-2 list-disc pl-4">
            {tier.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">Subscribe</button>
        </div>
      ))}
    </div>
  </div>
);

export default PremiumsPanel;

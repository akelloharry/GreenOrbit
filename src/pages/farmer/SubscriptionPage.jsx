import React from 'react';

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Manage Subscription</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Current Plan</h2>
          <div className="p-3 bg-green-100 rounded">Basic (Free)</div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Upgrade Plan</h2>
          <button className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition mb-2">Go Premium</button>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Go Pro</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;

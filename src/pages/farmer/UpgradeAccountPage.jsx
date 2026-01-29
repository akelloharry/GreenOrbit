import React from 'react';

const UpgradeAccountPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Upgrade Account</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto space-y-6">
        <p className="mb-4">Upgrade your account to access more features and premium support.</p>
        <button className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition mb-2">Upgrade to Premium</button>
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Upgrade to Pro</button>
      </div>
    </div>
  );
};

export default UpgradeAccountPage;

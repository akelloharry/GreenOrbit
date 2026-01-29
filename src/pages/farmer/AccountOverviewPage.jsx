import React from 'react';

const AccountOverviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Account</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Account Details</h2>
          <div className="p-3 bg-gray-100 rounded">
            <div><span className="font-medium">Name:</span> Jane Farmer</div>
            <div><span className="font-medium">Email:</span> jane@example.com</div>
            <div><span className="font-medium">Subscription:</span> Basic (Free)</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <a href="/farmer/subscription" className="w-full py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition">Manage Subscription</a>
          <a href="/farmer/upgrade" className="w-full py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition">Upgrade Account</a>
          <a href="/farmer/delete" className="w-full py-2 bg-red-600 text-white rounded-lg text-center hover:bg-red-700 transition">Delete Account</a>
        </div>
      </div>
    </div>
  );
};

export default AccountOverviewPage;

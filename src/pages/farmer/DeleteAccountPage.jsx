import React from 'react';

const DeleteAccountPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Delete Account</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto space-y-6">
        <p className="mb-4 text-red-700">Warning: This action is permanent and cannot be undone.</p>
        <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete My Account</button>
      </div>
    </div>
  );
};

export default DeleteAccountPage;

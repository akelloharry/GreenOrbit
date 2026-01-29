import React from 'react';

const RegisterFarmPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Register New Farm</h1>
      <form className="bg-white rounded-lg shadow p-6 max-w-lg mx-auto space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Farm Name</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g. Kitale North" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Location (Lat, Long)</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g. 1.015, 35.006" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Acreage (ha)</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g. 5" />
        </div>
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Register Farm</button>
      </form>
    </div>
  );
};

export default RegisterFarmPage;

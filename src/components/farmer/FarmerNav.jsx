/**
 * Farmer Navigation Component
 * Header with user info and logout
 */

import React from 'react';

const FarmerNav = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 text-white p-2 rounded-lg">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-gray-800">GreenOrbit</h1>
            <p className="text-xs text-gray-600">Maize Health Monitor</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="font-medium text-gray-800">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-600">{user?.email || 'farmer@example.com'}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default FarmerNav;

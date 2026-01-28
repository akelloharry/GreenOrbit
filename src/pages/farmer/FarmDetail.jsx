/**
 * Farm Detail Page
 * Detailed analytics for a specific farm
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FarmDetail = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <button
          onClick={() => navigate('/farmer')}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{farmId} - Detailed Analytics</h1>
          <p className="text-gray-600 mb-6">
            Comprehensive farm analysis, historical data, and trend analysis
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-bold text-lg text-gray-800 mb-4">Temperature Trends</h2>
              <div className="h-64 bg-white border border-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart placeholder - 30-day temperature trend</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-bold text-lg text-gray-800 mb-4">Humidity Trends</h2>
              <div className="h-64 bg-white border border-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart placeholder - 30-day humidity trend</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-bold text-lg text-gray-800 mb-4">Soil Moisture Trends</h2>
              <div className="h-64 bg-white border border-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart placeholder - 30-day soil moisture trend</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-bold text-lg text-gray-800 mb-4">NDRE (Crop Health) Trends</h2>
              <div className="h-64 bg-white border border-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Chart placeholder - 30-day NDRE trend</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 text-sm">
              <strong>💡 Coming Soon:</strong> Detailed analytics with historical charts, trend analysis, and
              downloadable reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDetail;

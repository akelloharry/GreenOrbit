/**
 * Map View Component
 * Displays farm boundary and risk zones
 */

import React, { useEffect, useState } from 'react';

const MapView = ({ farmData }) => {
  const { location } = farmData;

  return (
    <div className="bg-gray-50 p-4 md:p-6">
      {/* Map Container - Using placeholder since Leaflet needs setup */}
      <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        {/* Placeholder Map */}
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-600 font-medium">Farm Map Visualization</p>
          <p className="text-gray-500 text-sm mt-1">
            Location: {location.latitude.toFixed(3)}°, {location.longitude.toFixed(3)}°
          </p>
          <div className="mt-4 p-3 bg-white rounded-lg inline-block">
            <p className="text-sm text-gray-700">
              <strong>Map Features:</strong>
            </p>
            <ul className="text-xs text-gray-600 mt-2 space-y-1">
              <li>✓ Farm boundary outline</li>
              <li>✓ Risk zones (Green/Yellow/Red)</li>
              <li>✓ Sensor locations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-700">Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-700">Moderate Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-700">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-900 rounded"></div>
          <span className="text-sm text-gray-700">Very High Risk</span>
        </div>
      </div>

      {/* Info Note */}
      <p className="text-xs text-gray-600 mt-4 p-3 bg-blue-50 rounded-lg">
        💡 Risk zones update automatically based on real-time sensor and satellite data. More detailed mapping coming soon.
      </p>
    </div>
  );
};

export default MapView;

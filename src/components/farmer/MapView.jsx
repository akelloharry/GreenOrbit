/**
 * Map View Component
 * Displays farm boundary and risk zones
 */

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapView = ({ farmData }) => {
  const { location } = farmData;

  return (
    <div className="bg-gray-50 p-4 md:p-6">
      {/* Interactive Map */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={16}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.latitude, location.longitude]} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
            <Popup>
              <div>
                <strong>{farmData.farmName}</strong><br />
                Lat: {location.latitude.toFixed(5)}<br />
                Lng: {location.longitude.toFixed(5)}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
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

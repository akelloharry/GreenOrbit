import React from 'react';

const SensorsPage = () => {
  // Example sensor sources
  const sensorSources = [
    { name: 'Sentinel-2', type: 'Satellite' },
    { name: 'MODIS', type: 'Satellite' },
    { name: 'NOAA Radar', type: 'Radar' },
    { name: 'Field Sensor A', type: 'Ground' },
    { name: 'Field Sensor B', type: 'Ground' },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Sensors Online</h1>
      <ul className="bg-white rounded-lg shadow p-6 space-y-2">
        {sensorSources.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-lg">
            <span className="font-bold">{s.name}</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{s.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorsPage;

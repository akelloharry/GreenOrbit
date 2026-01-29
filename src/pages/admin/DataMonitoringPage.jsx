import React from 'react';

const DataMonitoringPage = () => {
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
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Data Monitoring</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-2">Real-time Sensor Streams</h2>
        <ul className="text-sm text-gray-700">
          {sensorSources.map((s, i) => (
            <li key={i}>{s.name} ({s.type})</li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold mb-2">Data Trends</h2>
        <p className="text-gray-600">(Charts and analytics would appear here in a full implementation.)</p>
      </div>
    </div>
  );
};

export default DataMonitoringPage;

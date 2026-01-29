import React from 'react';

const MonitoredFarmsPage = () => {
  const monitoredFarms = [
    { id: 'FARM-001', name: 'Kitale Central', acreage: 12, location: '1.015, 35.006' },
    { id: 'FARM-002', name: 'Kiminini', acreage: 8, location: '0.966, 34.991' },
    { id: 'FARM-003', name: 'Endebess', acreage: 15, location: '1.080, 34.850' },
    { id: 'FARM-004', name: 'Cherangany', acreage: 10, location: '1.140, 35.180' },
    { id: 'FARM-005', name: 'Saboti', acreage: 7, location: '1.120, 34.950' },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Monitored Farms Registry</h1>
      <table className="w-full bg-white rounded-lg shadow p-6 text-sm">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="text-left py-2">Farm</th>
            <th className="text-left py-2">Acreage (ha)</th>
            <th className="text-left py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {monitoredFarms.map((farm, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium text-gray-800">{farm.name}</td>
              <td className="py-3">{farm.acreage}</td>
              <td className="py-3">{farm.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonitoredFarmsPage;

/**
 * Admin Dashboard - Main Page
 * System overview and monitoring
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // Static mock stats for demo
  // Demo data for sensors, farms, alerts
  const sensorSources = [
    { name: 'Sentinel-2', type: 'Satellite' },
    { name: 'MODIS', type: 'Satellite' },
    { name: 'NOAA Radar', type: 'Radar' },
    { name: 'Field Sensor A', type: 'Ground' },
    { name: 'Field Sensor B', type: 'Ground' },
  ];
  const monitoredFarms = [
    { id: 'FARM-001', name: 'Kitale Central', acreage: 12, location: '1.015, 35.006' },
    { id: 'FARM-002', name: 'Kiminini', acreage: 8, location: '0.966, 34.991' },
    { id: 'FARM-003', name: 'Endebess', acreage: 15, location: '1.080, 34.850' },
    { id: 'FARM-004', name: 'Cherangany', acreage: 10, location: '1.140, 35.180' },
    { id: 'FARM-005', name: 'Saboti', acreage: 7, location: '1.120, 34.950' },
  ];
  const activeAlerts = [
    { id: 'ALERT-001', farm: monitoredFarms[0], pest: 'Fall Armyworm', risk: 'High', status: 'Active' },
    { id: 'ALERT-002', farm: monitoredFarms[1], pest: 'Aphids', risk: 'Moderate', status: 'Active' },
  ];
  const stats = {
    totalMonitoredFarms: monitoredFarms.length,
    activeAlerts: activeAlerts.length,
    modelConfidenceScore: 92,
    sensorsOnline: sensorSources.length,
    sensorsOffline: 1,
  };
  const loading = false;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-800">GreenOrbit Admin</h1>
              <p className="text-xs text-gray-600">System Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="font-medium text-gray-800">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-600">{user?.email || 'admin@example.com'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">System Overview</h1>

        {stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Monitored Farms"
                value={stats.totalMonitoredFarms}
                icon="🌾"
                color="bg-green-100 text-green-800"
                onClick={() => alert('Monitored Farms:\n' + monitoredFarms.map(f => `${f.name} (${f.acreage} ha)`).join('\n'))}
              />
              <StatCard
                title="Active Alerts"
                value={stats.activeAlerts}
                icon="🚨"
                color="bg-red-100 text-red-800"
                onClick={() => alert('Active Alerts:\n' + activeAlerts.map(a => `${a.farm.name}: ${a.pest} (${a.risk})`).join('\n'))}
              />
              <StatCard
                title="Model Confidence"
                value={`${stats.modelConfidenceScore}%`}
                icon="🤖"
                color="bg-blue-100 text-blue-800"
              />
              <StatCard
                title="Sensors Online"
                value={stats.sensorsOnline}
                icon="📡"
                color="bg-purple-100 text-purple-800"
                onClick={() => alert('Sensors Online:\n' + sensorSources.map(s => `${s.name} (${s.type})`).join('\n'))}
              />
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Data Monitoring */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Data Monitoring</h2>
                <div className="space-y-4">
                  <div className="h-64 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                    <div>
                      <p className="text-gray-500 mb-2">Real-time sensor streams and data trends</p>
                      <ul className="text-xs text-gray-700">
                        {sensorSources.map((s, i) => (
                          <li key={i}>{s.name} ({s.type})</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Data Monitoring: Showing sensor data and trends.')}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Detailed Monitoring
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">⚙️ Quick Actions</h2>
                <div className="space-y-3">
                  <button
                    onClick={() => alert('Model Management: Adjust ML model parameters.')}
                    className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                  >
                    Model Management
                  </button>
                  <button
                    onClick={() => alert('Alert Management: View and manage active pest alerts.')}
                    className="w-full py-2 px-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                  >
                    Alert Management
                  </button>
                  <button
                    onClick={() => alert('Farmer Feedback: Review feedback from farmers.')}
                    className="w-full py-2 px-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                  >
                    Farmer Feedback
                  </button>
                  <button
                    onClick={() => alert('System Reports: Generate and view system reports.')}
                    className="w-full py-2 px-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition text-sm font-medium"
                  >
                    System Reports
                  </button>
                </div>
              </div>
            </div>

            {/* Alert History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔔 Active Alerts</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2">Farm</th>
                      <th className="text-left py-2">Pest</th>
                      <th className="text-left py-2">Risk Level</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeAlerts.map((alert, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-3">{alert.farm.name}</td>
                        <td className="py-3">{alert.pest}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${alert.risk === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{alert.risk}</span>
                        </td>
                        <td className="py-3">{alert.status}</td>
                        <td className="py-3">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded mr-2 text-xs" onClick={() => alert(`Viewing details for ${alert.farm.name}`)}>View</button>
                          <button className="px-3 py-1 bg-green-600 text-white rounded text-xs" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${alert.farm.location}`, '_blank')}>Get Directions</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monitored Farms */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🌾 Monitored Farms Registry</h2>
              <table className="w-full text-sm">
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
          </>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg p-6 shadow`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium opacity-75">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
  </div>
);

export default AdminDashboard;

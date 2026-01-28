/**
 * Admin Alert Management Page
 * View and manage active pest/disease alerts
 */

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AlertManagement = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, resolved

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts');
        if (!response.ok) throw new Error('Failed to fetch alerts');
        const data = await response.json();
        setAlerts(data.data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load alerts');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'active') return alert.status === 'Active';
    if (filter === 'resolved') return alert.status === 'Resolved';
    return true;
  });

  const getRiskColor = (level) => {
    if (level === 'Very High') return 'bg-red-900 text-white';
    if (level === 'High') return 'bg-red-100 text-red-800';
    if (level === 'Moderate') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getRiskBadgeColor = (level) => {
    if (level === 'Very High') return 'border-red-900';
    if (level === 'High') return 'border-red-600';
    if (level === 'Moderate') return 'border-yellow-600';
    return 'border-green-600';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🔔 Alert Management</h1>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          {['all', 'active', 'resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
              }`}
            >
              {tab === 'all' ? 'All Alerts' : tab === 'active' ? 'Active' : 'Resolved'}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} riskColor={getRiskColor(alert.riskLevel)} />
            ))
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-600">No {filter !== 'all' ? filter : ''} alerts found</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox title="Total Alerts" value={alerts.length} color="bg-blue-100 text-blue-800" />
          <StatBox
            title="Active Alerts"
            value={alerts.filter((a) => a.status === 'Active').length}
            color="bg-red-100 text-red-800"
          />
          <StatBox
            title="Resolved Alerts"
            value={alerts.filter((a) => a.status === 'Resolved').length}
            color="bg-green-100 text-green-800"
          />
        </div>
      </div>
    </div>
  );
};

const AlertCard = ({ alert, riskColor }) => (
  <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${riskColor.includes('bg-red-900') ? 'border-red-900' : riskColor.includes('bg-red-100') ? 'border-red-600' : riskColor.includes('bg-yellow') ? 'border-yellow-600' : 'border-green-600'}`}>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
      <div>
        <p className="text-gray-600 text-sm">Farm</p>
        <p className="font-bold text-lg text-gray-800">{alert.farmId}</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm">Pest/Disease</p>
        <p className="font-bold text-lg text-gray-800">{alert.pestName}</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm">Risk Level</p>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${riskColor}`}>
          {alert.riskLevel}
        </div>
      </div>
      <div className="flex items-end justify-between md:flex-col md:items-start">
        <div>
          <p className="text-gray-600 text-sm">Status</p>
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
              alert.status === 'Active'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {alert.status}
          </span>
        </div>
        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  </div>
);

const StatBox = ({ title, value, color }) => (
  <div className={`${color} rounded-lg p-6 text-center shadow`}>
    <p className="text-sm font-medium opacity-75">{title}</p>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);

export default AlertManagement;

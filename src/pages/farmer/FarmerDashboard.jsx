/**
 * Farmer Dashboard - Main Page
 * Mobile-first, simple interface for farmers
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import HomeSummaryCard from '../../components/farmer/HomeSummaryCard';
import EarlyWarningAlertCard from '../../components/farmer/EarlyWarningAlertCard';
import MapView from '../../components/farmer/MapView';
import ExplainableAIPanel from '../../components/farmer/ExplainableAIPanel';
import WhatToDoPanel from '../../components/farmer/WhatToDoPanel';
import RealTimeSensorStatus from '../../components/farmer/RealTimeSensorStatus';
import FarmerNav from '../../components/farmer/FarmerNav';
import TraditionalIndicatorsPanel from '../../components/farmer/TraditionalIndicatorsPanel';
import PremiumsPanel from '../../components/farmer/PremiumsPanel';
import { generateMockFarmData } from '../../utils/mockData';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedFarm, setSelectedFarm] = useState('FARM-001');
  const [farmData, setFarmData] = useState(generateMockFarmData(selectedFarm));
  const [loading, setLoading] = useState(false);
  const [wsConnected] = useState(false); // Always false for static demo

  /**
   * Fetch farm data
   */
  useEffect(() => {
    // For static demo, just generate new mock data when farm changes
    setFarmData(generateMockFarmData(selectedFarm));
  }, [selectedFarm]);

  /**
   * WebSocket for real-time sensor updates
   */
  // WebSocket logic removed for static demo

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <FarmerNav user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="p-4 md:p-6 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {user?.name || 'Farmer'}! 👨‍🌾
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Your farm's health status and pest warnings
          </p>
        </div>

        {/* Farm Selector */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {['FARM-001', 'FARM-002', 'FARM-003', 'FARM-004', 'FARM-005'].map((farmId) => (
            <button
              key={farmId}
              onClick={() => setSelectedFarm(farmId)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                selectedFarm === farmId
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-green-600'
              }`}
            >
              {farmId}
            </button>
          ))}
        </div>

        {farmData ? (
          <div className="space-y-6">
            {/* Row 1: Summary & Alerts & Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <HomeSummaryCard farmData={farmData} />
                {/* Overview of traditional indicators */}
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">Traditional Indicators Overview</h2>
                  <ul className="text-sm text-gray-700">
                    <li>NDRE: {farmData.satelliteData.ndre.toFixed(3)}</li>
                    <li>Soil Moisture: {farmData.sensorData.soilMoisture.toFixed(1)}%</li>
                    <li>Temperature: {farmData.sensorData.temperature.toFixed(1)}°C</li>
                    <li>Humidity: {farmData.sensorData.humidity.toFixed(1)}%</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">See full details in the panel below.</p>
                </div>
              </div>
              <div className="space-y-4">
                {farmData.riskAssessment.activePests.length > 0 ? (
                  farmData.riskAssessment.activePests.map((pest, index) => (
                    <EarlyWarningAlertCard key={index} pest={pest} />
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                    <p className="text-green-700 font-medium">✅ No active pest alerts</p>
                    <p className="text-gray-600 text-sm">Current conditions are favorable for crop growth</p>
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Map */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">Farm Map</h2>
              </div>
              <MapView farmData={farmData} />
            </div>

            {/* Row 3: Traditional Indicators Panel */}
            <TraditionalIndicatorsPanel farmData={farmData} />

            {/* Row 4: Explainable AI */}
            <ExplainableAIPanel farmData={farmData} />

            {/* Row 5: What To Do */}
            {farmData.riskAssessment.activePests.length > 0 && (
              <WhatToDoPanel pest={farmData.riskAssessment.activePests[0]} />
            )}

            {/* Row 6: Real-time Sensors */}
            <RealTimeSensorStatus
              sensorData={farmData.sensorData}
              wsConnected={wsConnected}
            />

            {/* Row 7: Premiums & Tiers */}
            <PremiumsPanel />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Unable to load farm data</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FarmerDashboard;

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

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedFarm, setSelectedFarm] = useState('FARM-001');
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);

  /**
   * Fetch farm data
   */
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        const response = await fetch(`/api/farms/${selectedFarm}`);
        if (!response.ok) throw new Error('Failed to fetch farm data');
        const data = await response.json();
        setFarmData(data.data);
      } catch (error) {
        console.error('Error fetching farm data:', error);
        toast.error('Failed to load farm data');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmData();
  }, [selectedFarm]);

  /**
   * WebSocket for real-time sensor updates
   */
  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setWsConnected(true);
      // Subscribe to farm updates
      ws.send(JSON.stringify({ type: 'subscribe', farmId: selectedFarm }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'sensor-update' && message.farmId === selectedFarm) {
          // Update sensor data in real-time
          setFarmData((prev) =>
            prev
              ? {
                  ...prev,
                  sensorData: message.data,
                }
              : null
          );
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsConnected(false);
    };

    ws.onclose = () => {
      setWsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'unsubscribe' }));
        ws.close();
      }
    };
  }, [selectedFarm]);

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
            {/* Row 1: Summary & Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HomeSummaryCard farmData={farmData} />
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

            {/* Row 3: Explainable AI */}
            <ExplainableAIPanel farmData={farmData} />

            {/* Row 4: What To Do */}
            {farmData.riskAssessment.activePests.length > 0 && (
              <WhatToDoPanel pest={farmData.riskAssessment.activePests[0]} />
            )}

            {/* Row 5: Real-time Sensors */}
            <RealTimeSensorStatus
              sensorData={farmData.sensorData}
              wsConnected={wsConnected}
            />
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

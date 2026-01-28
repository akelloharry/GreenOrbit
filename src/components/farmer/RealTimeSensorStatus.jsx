/**
 * Real-Time Sensor Status Component
 * Displays live sensor readings with connection status
 */

import React from 'react';

const RealTimeSensorStatus = ({ sensorData, wsConnected }) => {
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const SensorCard = ({ title, value, unit, min, max, status, icon }) => {
    let statusColor = 'text-green-700';
    let statusBg = 'bg-green-50';
    
    if (status === 'warning') {
      statusColor = 'text-amber-700';
      statusBg = 'bg-amber-50';
    } else if (status === 'critical') {
      statusColor = 'text-red-700';
      statusBg = 'bg-red-50';
    }

    // Calculate percentage for progress bar
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className={`${statusBg} rounded-lg p-4 border-l-4 ${statusColor.replace('text', 'border')}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {value.toFixed(1)} <span className="text-sm text-gray-600">{unit}</span>
            </p>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              status === 'ok' ? 'bg-green-500' : status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          ></div>
        </div>

        {/* Range */}
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Min: {min}{unit}</span>
          <span>Max: {max}{unit}</span>
        </div>
      </div>
    );
  };

  // Determine sensor status
  const getSensorStatus = (type, value) => {
    if (type === 'temperature') {
      if (value >= 25 && value <= 30) return 'ok';
      if (value < 20 || value > 35) return 'critical';
      return 'warning';
    }
    if (type === 'humidity') {
      if (value >= 50 && value <= 70) return 'ok';
      if (value < 30 || value > 80) return 'warning';
      return 'critical';
    }
    if (type === 'moisture') {
      if (value >= 40 && value <= 70) return 'ok';
      if (value < 30 || value > 80) return 'warning';
      return 'critical';
    }
    return 'ok';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            📡 Real-Time Sensor Status
          </h2>
          <p className="text-cyan-100 text-sm">Live IoT sensor readings</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${wsConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm font-medium">
            {wsConnected ? 'Connected' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-4">
        {/* Sensor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SensorCard
            title="Soil Moisture"
            value={sensorData.soilMoisture}
            unit="%"
            min={0}
            max={100}
            status={getSensorStatus('moisture', sensorData.soilMoisture)}
            icon="💧"
          />
          <SensorCard
            title="Temperature"
            value={sensorData.temperature}
            unit="°C"
            min={0}
            max={40}
            status={getSensorStatus('temperature', sensorData.temperature)}
            icon="🌡️"
          />
          <SensorCard
            title="Humidity"
            value={sensorData.humidity}
            unit="%"
            min={0}
            max={100}
            status={getSensorStatus('humidity', sensorData.humidity)}
            icon="💨"
          />
        </div>

        {/* Update Info */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Last Update</p>
              <p className="font-semibold text-gray-800">{formatTime(sensorData.lastUpdate)}</p>
            </div>
            <div>
              <p className="text-gray-600">Connection Status</p>
              <p className="font-semibold flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {wsConnected ? 'Active' : 'Disconnected'}
              </p>
            </div>
          </div>
        </div>

        {/* Sensor Health Note */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <p className="text-blue-900 text-xs md:text-sm">
            <strong>✓ Sensor Health:</strong> All sensors reporting normally. Data updates every 10 seconds when connected.
          </p>
        </div>

        {/* Historical Trend Placeholder */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-gray-800 text-sm mb-3">📊 24-Hour Trend</p>
          <div className="h-32 bg-white rounded border border-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Historical chart will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeSensorStatus;

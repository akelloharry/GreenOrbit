/**
 * Home Summary Card Component
 * Displays overall crop health and main risk indicators
 */

import React from 'react';
import { getRiskColor } from '../../constants/indicators';

const HomeSummaryCard = ({ farmData }) => {
  const { riskAssessment } = farmData;
  const cropHealth = riskAssessment.cropHealth;
  const pestRisk = riskAssessment.pestRisk;
  const diseaseRisk = riskAssessment.diseaseRisk;

  const getHealthColor = (status) => {
    if (status === 'Healthy') return 'bg-green-100 text-green-800 border-green-500';
    if (status === 'Moderate Stress') return 'bg-yellow-100 text-yellow-800 border-yellow-500';
    return 'bg-red-100 text-red-800 border-red-500';
  };

  const getEmoji = (status) => {
    if (status === 'Healthy') return '🌱';
    if (status === 'Moderate Stress') return '⚠️';
    return '🚨';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <h2 className="text-xl font-bold">Crop Health Summary</h2>
        <p className="text-green-100 text-sm">Real-time assessment</p>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-4">
        {/* Crop Health */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-gray-600 text-sm font-medium">Crop Health</p>
              <p className="text-gray-500 text-xs">Based on NDRE satellite index</p>
            </div>
            <span className="text-3xl">{getEmoji(cropHealth.status)}</span>
          </div>
          <div className={`px-3 py-2 rounded-lg border-l-4 font-semibold ${getHealthColor(cropHealth.status)}`}>
            {cropHealth.status} (NDRE: {cropHealth.ndreValue.toFixed(3)})
          </div>
        </div>

        {/* Pest Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pest Risk Level</p>
              <p className="text-gray-500 text-xs">Predicted threat</p>
            </div>
            <span className="text-2xl">🐛</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex-1 px-3 py-2 rounded-lg font-semibold text-white`}
              style={{ backgroundColor: getRiskColor(pestRisk.level) }}
            >
              {pestRisk.level}
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
              {pestRisk.confidence}%
            </div>
          </div>
        </div>

        {/* Disease Risk */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-600 text-sm font-medium">Disease Risk Level</p>
              <p className="text-gray-500 text-xs">Fungal & bacterial risk</p>
            </div>
            <span className="text-2xl">🦠</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex-1 px-3 py-2 rounded-lg font-semibold text-white`}
              style={{ backgroundColor: getRiskColor(diseaseRisk.level) }}
            >
              {diseaseRisk.level}
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
              {diseaseRisk.confidence}%
            </div>
          </div>
        </div>

        {/* Farm Info */}
        <div className="pt-4 border-t mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Farm ID</p>
              <p className="font-semibold text-gray-800">{farmData.farmId}</p>
            </div>
            <div>
              <p className="text-gray-600">Area</p>
              <p className="font-semibold text-gray-800">{farmData.areaMeasure} ha</p>
            </div>
            <div>
              <p className="text-gray-600">Crop Stage</p>
              <p className="font-semibold text-gray-800">{farmData.cropStage}</p>
            </div>
            <div>
              <p className="text-gray-600">Last Update</p>
              <p className="font-semibold text-gray-800">
                {new Date(farmData.lastUpdate).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSummaryCard;

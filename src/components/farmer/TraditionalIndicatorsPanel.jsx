/**
 * Indicators Panel
 * Shows crop indicators and their pest associations for the selected farm
 */

import React from 'react';
import { NDRE_CLASSIFICATIONS, SOIL_MOISTURE_CLASSIFICATIONS, TEMPERATURE_CLASSIFICATIONS, HUMIDITY_CLASSIFICATIONS } from '../../constants/indicators';

const getIndicatorsForFarm = (farmData) => {
  // Extract current indicator values
  const { ndre } = farmData.satelliteData;
  const { soilMoisture, temperature, humidity } = farmData.sensorData;

  // Find matching indicator classes
  const ndreClass = Object.values(NDRE_CLASSIFICATIONS).find(c => ndre >= c.minValue && ndre <= c.maxValue) || {};
  const moistureClass = Object.values(SOIL_MOISTURE_CLASSIFICATIONS).find(c => soilMoisture >= c.minValue && soilMoisture <= c.maxValue) || {};
  const tempClass = Object.values(TEMPERATURE_CLASSIFICATIONS).find(c => temperature >= c.minValue && temperature <= c.maxValue) || {};
  const humidityClass = Object.values(HUMIDITY_CLASSIFICATIONS).find(c => humidity >= c.minValue && humidity <= c.maxValue) || {};

  return [
    { label: 'NDRE', value: ndre?.toFixed(3) ?? 'N/A', ...ndreClass },
    { label: 'Soil Moisture', value: soilMoisture?.toFixed(1) ?? 'N/A', ...moistureClass },
    { label: 'Temperature', value: temperature?.toFixed(1) ?? 'N/A', ...tempClass },
    { label: 'Humidity', value: humidity?.toFixed(1) ?? 'N/A', ...humidityClass },
  ];
};

const TraditionalIndicatorsPanel = ({ farmData }) => {
  const indicators = getIndicatorsForFarm(farmData);

  // Helper to rename pests
  const renamePest = (pest) => {
    if (pest === 'Leafhoppers') return 'Grasshoppers';
    if (pest === 'Stem borers') return 'Stalk borers';
    return pest;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🌱 Crop Indicators & Pest Links</h2>
      <div className="space-y-4">
        {indicators.map((ind, idx) => (
          <div key={idx} className="border-l-4 p-4 mb-2" style={{ borderColor: ind.riskLevel === 'Low' ? '#22c55e' : ind.riskLevel === 'Moderate' ? '#eab308' : ind.riskLevel === 'High' ? '#ef4444' : '#7f1d1d' }}>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">{ind.label}: <span className="text-blue-700">{ind.value}</span></span>
              <span className="px-2 py-1 rounded text-xs font-bold" style={{ background: ind.riskLevel === 'Low' ? '#bbf7d0' : ind.riskLevel === 'Moderate' ? '#fef08a' : ind.riskLevel === 'High' ? '#fecaca' : '#fca5a5', color: ind.riskLevel === 'Low' ? '#166534' : ind.riskLevel === 'Moderate' ? '#92400e' : ind.riskLevel === 'High' ? '#991b1b' : '#7f1d1d' }}>{ind.riskLevel ?? 'N/A'}</span>
            </div>
            <div className="mt-2 text-gray-600 text-sm">{ind.traditionalIndicator ?? 'No indicator available.'}</div>
            <div className="mt-1 text-xs text-gray-500">{ind.explanation ?? ''}</div>
            {ind.pestsAtRisk && ind.pestsAtRisk.length > 0 && (
              <div className="mt-2 text-xs text-red-700">
                <strong>Pests at risk:</strong> {ind.pestsAtRisk.map(renamePest).join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TraditionalIndicatorsPanel;

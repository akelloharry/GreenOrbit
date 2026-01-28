/**
 * Explainable AI Panel Component
 * Shows why the alert was generated - indicator analysis
 */

import React from 'react';
import { classifyNDRE, classifySoilMoisture, classifyTemperature, classifyHumidity } from '../../constants/indicators';
import { getRiskColor } from '../../constants/indicators';

const ExplainableAIPanel = ({ farmData }) => {
  const { satelliteData, sensorData } = farmData;

  const ndreClass = classifyNDRE(satelliteData.ndre);
  const moistureClass = classifySoilMoisture(sensorData.soilMoisture);
  const tempClass = classifyTemperature(sensorData.temperature);
  const humidityClass = classifyHumidity(sensorData.humidity);

  const IndicatorRow = ({ label, value, unit, status, explanation }) => (
    <div className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-gray-700 font-medium text-sm md:text-base">{label}</p>
          <p className="text-gray-500 text-xs">Status: {status}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">
            {value}
            <span className="text-sm text-gray-600 ml-1">{unit}</span>
          </p>
        </div>
      </div>
      <p className="text-gray-600 text-xs md:text-sm">{explanation}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          🤔 Why This Alert?
        </h2>
        <p className="text-blue-100 text-sm">Explainable AI analysis of your farm conditions</p>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-6">
        {/* NDRE */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                🌿 Crop Stress Index (NDRE)
              </h3>
              <p className="text-gray-600 text-xs mt-1">Satellite measurement from Sentinel-2</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-white font-semibold text-xs"
              style={{ backgroundColor: getRiskColor(ndreClass.riskLevel) }}
            >
              {ndreClass.description}
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800 mb-2">
            {satelliteData.ndre.toFixed(3)} <span className="text-sm text-gray-600">(range: 0.0 - 1.0)</span>
          </p>
          <p className="text-gray-700 text-sm">{ndreClass.explanation}</p>
          <p className="text-gray-600 text-xs mt-2">Traditional indicator: {ndreClass.traditionalIndicator}</p>
        </div>

        {/* Soil Moisture */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                💧 Soil Moisture
              </h3>
              <p className="text-gray-600 text-xs mt-1">IoT sensor reading</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-white font-semibold text-xs"
              style={{ backgroundColor: getRiskColor(moistureClass.riskLevel) }}
            >
              {moistureClass.description}
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800 mb-2">
            {sensorData.soilMoisture.toFixed(1)}% <span className="text-sm text-gray-600">(0-100%)</span>
          </p>
          <p className="text-gray-700 text-sm">{moistureClass.explanation}</p>
          <p className="text-gray-600 text-xs mt-2">Traditional indicator: {moistureClass.traditionalIndicator}</p>
        </div>

        {/* Temperature */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                🌡️ Temperature
              </h3>
              <p className="text-gray-600 text-xs mt-1">Weather station data</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-white font-semibold text-xs"
              style={{ backgroundColor: getRiskColor(tempClass.riskLevel) }}
            >
              {tempClass.description}
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800 mb-2">
            {sensorData.temperature.toFixed(1)}°C <span className="text-sm text-gray-600">(Celsius)</span>
          </p>
          <p className="text-gray-700 text-sm">{tempClass.explanation}</p>
          <p className="text-gray-600 text-xs mt-2">Traditional indicator: {tempClass.traditionalIndicator}</p>
        </div>

        {/* Humidity */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                💨 Humidity
              </h3>
              <p className="text-gray-600 text-xs mt-1">Atmospheric moisture level</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-white font-semibold text-xs"
              style={{ backgroundColor: getRiskColor(humidityClass.riskLevel) }}
            >
              {humidityClass.description}
            </span>
          </div>
          <p className="text-lg font-bold text-gray-800 mb-2">
            {sensorData.humidity.toFixed(1)}% <span className="text-sm text-gray-600">(0-100%)</span>
          </p>
          <p className="text-gray-700 text-sm">{humidityClass.explanation}</p>
          <p className="text-gray-600 text-xs mt-2">Traditional indicator: {humidityClass.traditionalIndicator}</p>
        </div>

        {/* Insight */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-900 text-sm font-medium mb-2">💡 AI Insight</p>
          <p className="text-yellow-800 text-xs md:text-sm">
            The system combines all these environmental factors to predict pest and disease risks. A combination
            of multiple indicators at risk levels suggests favorable conditions for pest development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplainableAIPanel;

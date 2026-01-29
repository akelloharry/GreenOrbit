/**
 * Early Warning Alert Card Component
 * Displays individual pest/disease threat with simple language
 */

import React from 'react';
import { getRiskColor } from '../../constants/indicators';

const EarlyWarningAlertCard = ({ pest }) => {
  const getRiskEmoji = (riskLevel) => {
    if (riskLevel === 'Very High') return '🚨';
    if (riskLevel === 'High') return '⚠️';
    if (riskLevel === 'Moderate') return '⚠️';
    return '✓';
  };

  return (
    <div
      className="bg-white rounded-lg shadow overflow-hidden border-l-4"
      style={{ borderColor: getRiskColor(pest.riskLevel) }}
    >
      <div className="p-4 md:p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <span className="text-2xl">{getRiskEmoji(pest.riskLevel)}</span>
            <div>
              <h3 className="font-bold text-gray-800 text-base md:text-lg">
                {pest.pestName}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">Early warning alert</p>
            </div>
          </div>
          <div
            className="px-3 py-1 rounded-full font-semibold text-white text-xs md:text-sm"
            style={{ backgroundColor: getRiskColor(pest.riskLevel) }}
          >
            {pest.riskLevel}
          </div>
        </div>

        {/* Risk Information */}
        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm bg-gray-50 p-3 rounded">
          <div>
            <p className="text-gray-600">Expected Timing</p>
            <p className="font-semibold text-gray-800">{pest.timeWindow}</p>
          </div>
          <div>
            <p className="text-gray-600">Probability</p>
            <p className="font-semibold text-gray-800">{pest.probability}%</p>
          </div>
        </div>

        {/* Traditional Indicator */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
          <p className="text-blue-900 text-xs md:text-sm">
            <strong>What to look for:</strong> {pest.pestName} leaves visible signs before damage becomes severe.
          </p>
        </div>

        {/* Action Button */}
        <a
          className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition text-sm text-center block"
          href="https://www.cimmyt.org/news/maize-scouting-guide/"
          target="_blank"
          rel="noopener noreferrer"
        >
          📍 Learn How to Scout
        </a>
      </div>
    </div>
  );
};

export default EarlyWarningAlertCard;

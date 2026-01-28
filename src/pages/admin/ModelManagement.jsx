/**
 * Admin Model Management Page
 * View and adjust ML model parameters
 */

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ModelManagement = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFeatures([
        { feature: 'NDRE', importance: 42, description: 'Normalized Difference Red Edge' },
        { feature: 'Soil Moisture', importance: 28, description: 'Soil moisture content' },
        { feature: 'Temperature', importance: 18, description: 'Ambient temperature' },
        { feature: 'Humidity', importance: 12, description: 'Relative humidity' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleRetrain = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Retraining model...',
        success: 'Model retrained successfully!',
        error: 'Failed to retrain model',
      }
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🤖 Model Management</h1>

        {/* Feature Importance */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Feature Importance in Pest Risk Prediction</h2>
          
          {features.map((feature, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-800">{feature.feature}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <span className="text-lg font-bold text-blue-600">{feature.importance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${feature.importance}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk Thresholds */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Risk Thresholds</h2>
          
          <div className="space-y-4">
            <ThresholdInput label="Low Risk Threshold (NDRE)" value="0.25" unit="" />
            <ThresholdInput label="Moderate Risk Threshold (NDRE)" value="0.15" unit="" />
            <ThresholdInput label="High Risk Threshold (NDRE)" value="0.05" unit="" />
            <ThresholdInput label="Soil Moisture Warning (Low)" value="40" unit="%" />
            <ThresholdInput label="Temperature Warning (High)" value="30" unit="°C" />
            <ThresholdInput label="Humidity Warning (High)" value="70" unit="%" />
          </div>

          <button className="mt-6 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
            Save Threshold Changes
          </button>
        </div>

        {/* Model Retraining */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Model Retraining</h2>
          <p className="text-gray-600 mb-4">
            Retrain the ML model with latest field data to improve accuracy and adapt to regional variations.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-900 text-sm">
              Last retraining: 7 days ago | Next scheduled: 7 days from now
            </p>
          </div>

          <button
            onClick={handleRetrain}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold"
          >
            🔄 Retrain Model Now
          </button>
        </div>
      </div>
    </div>
  );
};

const ThresholdInput = ({ label, value, unit }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <label className="font-medium text-gray-700">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="number"
        defaultValue={value}
        className="px-3 py-1 border border-gray-300 rounded w-24 text-right"
      />
      <span className="text-gray-600 font-medium min-w-fit">{unit}</span>
    </div>
  </div>
);

export default ModelManagement;

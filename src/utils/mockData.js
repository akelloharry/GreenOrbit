/**
 * Mock Data Generator for Development and Testing
 */

import { assessPestRisk, predictActivePests, calculateDiseaseRisk } from './riskAssessment';

/**
 * Generate mock sensor data
 */
export const generateMockSensorData = () => {
  return {
    soilMoisture: 45 + Math.random() * 30, // 45-75%
    temperature: 20 + Math.random() * 10, // 20-30°C
    humidity: 55 + Math.random() * 20, // 55-75%
    lastUpdate: new Date().toISOString(),
  };
};

/**
 * Generate mock satellite data (NDVI, NDRE, NDWI)
 */
export const generateMockSatelliteData = () => {
  const ndre = 0.2 + Math.random() * 0.3; // 0.2-0.5
  const ndvi = 0.4 + Math.random() * 0.35; // 0.4-0.75
  const ndwi = 0.2 + Math.random() * 0.4; // 0.2-0.6

  return {
    ndre,
    ndvi,
    ndwi,
    lastUpdate: new Date().toISOString(),
    source: 'Sentinel-2',
  };
};

/**
 * Generate complete farm assessment data
 */
export const generateMockFarmData = (farmId = 'FARM-001') => {
  const sensorData = generateMockSensorData();
  const satelliteData = generateMockSatelliteData();

  const indicators = {
    ndre: satelliteData.ndre,
    soilMoisture: sensorData.soilMoisture,
    temperature: sensorData.temperature,
    humidity: sensorData.humidity,
  };

  const pestRisk = assessPestRisk(indicators);
  const activePests = predictActivePests(indicators);
  const diseaseRisk = calculateDiseaseRisk(indicators);

  return {
    farmId,
    farmName: `Farm ${farmId}`,
    location: {
      latitude: -1.3 + Math.random() * 0.5,
      longitude: 36.8 + Math.random() * 0.5,
    },
    cropType: 'Maize',
    cropStage: '4-leaf to boot',
    areaMeasure: 2.5, // hectares
    lastUpdate: new Date().toISOString(),
    
    // Sensor data
    sensorData: {
      soilMoisture: sensorData.soilMoisture,
      temperature: sensorData.temperature,
      humidity: sensorData.humidity,
      lastUpdate: sensorData.lastUpdate,
    },

    // Satellite data
    satelliteData: {
      ndre: satelliteData.ndre,
      ndvi: satelliteData.ndvi,
      ndwi: satelliteData.ndwi,
      lastUpdate: satelliteData.lastUpdate,
    },

    // Risk assessment
    riskAssessment: {
      cropHealth: {
        status: satelliteData.ndre > 0.4 ? 'Healthy' : satelliteData.ndre > 0.2 ? 'Moderate Stress' : 'Severe Stress',
        color: satelliteData.ndre > 0.4 ? 'Green' : satelliteData.ndre > 0.2 ? 'Yellow' : 'Red',
        ndreValue: satelliteData.ndre,
      },
      pestRisk: {
        level: pestRisk.overallRiskLevel,
        color: pestRisk.riskColor,
        confidence: pestRisk.confidence,
      },
      diseaseRisk: {
        level: diseaseRisk.diseaseRiskLevel,
        confidence: diseaseRisk.confidence,
      },
      activePests: activePests.slice(0, 3), // Top 3 threats
    },
  };
};

/**
 * Generate multiple farm data
 */
export const generateMockFarmsData = (count = 5) => {
  const farms = [];
  for (let i = 1; i <= count; i++) {
    farms.push(generateMockFarmData(`FARM-${String(i).padStart(3, '0')}`));
  }
  return farms;
};

/**
 * Generate historical data for charts
 */
export const generateMockHistoricalData = (days = 30) => {
  const data = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Simulate realistic variations
    const baseTemp = 24 + Math.sin(i / 10) * 5;
    const baseHumidity = 60 + Math.cos(i / 8) * 15;
    const baseMoisture = 50 + Math.sin(i / 12) * 20;

    data.push({
      date: date.toISOString().split('T')[0],
      temperature: baseTemp + (Math.random() - 0.5) * 2,
      humidity: Math.max(30, Math.min(95, baseHumidity + (Math.random() - 0.5) * 3)),
      soilMoisture: Math.max(20, Math.min(85, baseMoisture + (Math.random() - 0.5) * 4)),
      ndre: 0.25 + Math.sin(i / 15) * 0.15 + (Math.random() - 0.5) * 0.05,
    });
  }

  return data;
};

/**
 * Generate alert data
 */
export const generateMockAlerts = () => {
  const alerts = [
    {
      id: 'ALERT-001',
      farmId: 'FARM-001',
      pestName: 'Fall Armyworm',
      riskLevel: 'High',
      confidence: 78,
      timeWindow: '7–10 days',
      detectedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Active',
    },
    {
      id: 'ALERT-002',
      farmId: 'FARM-002',
      pestName: 'Aphids',
      riskLevel: 'Moderate',
      confidence: 65,
      timeWindow: '5–7 days',
      detectedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Active',
    },
    {
      id: 'ALERT-003',
      farmId: 'FARM-001',
      pestName: 'Thrips',
      riskLevel: 'Moderate',
      confidence: 58,
      timeWindow: '5–8 days',
      detectedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Resolved',
    },
  ];

  return alerts;
};

/**
 * Generate farmer feedback data
 */
export const generateMockFarmerFeedback = () => {
  return [
    {
      id: 'FB-001',
      farmId: 'FARM-001',
      alertId: 'ALERT-001',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      pestConfirmed: true,
      photoUrl: 'https://via.placeholder.com/300x200?text=FAW+Damage',
      observations: 'Confirmed FAW on FARM-001. Many larvae in leaf whorls.',
      controlMeasuresTaken: 'Applied Bt spray',
    },
    {
      id: 'FB-002',
      farmId: 'FARM-002',
      alertId: 'ALERT-002',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      pestConfirmed: false,
      photoUrl: 'https://via.placeholder.com/300x200?text=No+Pest',
      observations: 'False positive - No aphids found on field inspection',
      controlMeasuresTaken: 'None',
    },
  ];
};

/**
 * Generate system stats for admin dashboard
 */
export const generateMockSystemStats = () => {
  return {
    totalMonitoredFarms: 145,
    activeAlerts: 8,
    resolvedAlerts: 312,
    modelConfidenceScore: 82.5,
    sensorsOnline: 287,
    sensorsOffline: 13,
    lastModelRetrain: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    nextModelRetrain: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
};

/**
 * Generate model feature importance data
 */
export const generateMockFeatureImportance = () => {
  return [
    { feature: 'NDRE', importance: 28.5, description: 'Crop stress indicator from satellite' },
    { feature: 'Soil Moisture', importance: 22.3, description: 'Root environment condition' },
    { feature: 'Temperature', importance: 20.1, description: 'Pest development speed' },
    { feature: 'Humidity', importance: 18.2, description: 'Disease and pest survival' },
    { feature: 'Rain Pattern', importance: 6.8, description: 'Water availability and fungal disease risk' },
    { feature: 'Time of Season', importance: 4.1, description: 'Pest life cycle stage' },
  ];
};

/**
 * Mock Data Generator for Server-side Use
 * This is a server version that doesn't depend on client modules
 */

/**
 * Generate mock sensor data
 */
function generateMockSensorData() {
  return {
    soilMoisture: 45 + Math.random() * 30,
    temperature: 20 + Math.random() * 10,
    humidity: 55 + Math.random() * 20,
    lastUpdate: new Date().toISOString(),
  };
}

/**
 * Generate mock satellite data
 */
function generateMockSatelliteData() {
  const ndre = 0.2 + Math.random() * 0.3;
  const ndvi = 0.4 + Math.random() * 0.35;
  const ndwi = 0.2 + Math.random() * 0.4;

  return {
    ndre,
    ndvi,
    ndwi,
    lastUpdate: new Date().toISOString(),
    source: 'Sentinel-2',
  };
}

/**
 * Assess pest risk (simplified server version)
 */
function assessPestRisk(indicators) {
  const { ndre = 0.3, soilMoisture = 50, temperature = 22, humidity = 60 } = indicators;

  let riskLevel = 'Low';
  let confidence = 60;

  if (ndre < 0.1) {
    riskLevel = 'Very High';
    confidence = 85;
  } else if (ndre < 0.2) {
    riskLevel = 'High';
    confidence = 78;
  } else if (ndre < 0.35) {
    riskLevel = 'Moderate';
    confidence = 70;
  }

  return {
    level: riskLevel,
    confidence,
  };
}

/**
 * Generate complete farm data
 */
function generateMockFarmData(farmId = 'FARM-001') {
  const sensorData = generateMockSensorData();
  const satelliteData = generateMockSatelliteData();

  const indicators = {
    ndre: satelliteData.ndre,
    soilMoisture: sensorData.soilMoisture,
    temperature: sensorData.temperature,
    humidity: sensorData.humidity,
  };

  const pestRisk = assessPestRisk(indicators);

  return {
    farmId,
    farmName: `Farm ${farmId}`,
    location: {
      latitude: -1.3 + Math.random() * 0.5,
      longitude: 36.8 + Math.random() * 0.5,
    },
    cropType: 'Maize',
    cropStage: '4-leaf to boot',
    areaMeasure: 2.5,
    lastUpdate: new Date().toISOString(),

    sensorData: {
      soilMoisture: sensorData.soilMoisture,
      temperature: sensorData.temperature,
      humidity: sensorData.humidity,
      lastUpdate: sensorData.lastUpdate,
    },

    satelliteData: {
      ndre: satelliteData.ndre,
      ndvi: satelliteData.ndvi,
      ndwi: satelliteData.ndwi,
      lastUpdate: satelliteData.lastUpdate,
    },

    riskAssessment: {
      cropHealth: {
        status:
          satelliteData.ndre > 0.4 ? 'Healthy' : satelliteData.ndre > 0.2 ? 'Moderate Stress' : 'Severe Stress',
        color: satelliteData.ndre > 0.4 ? 'Green' : satelliteData.ndre > 0.2 ? 'Yellow' : 'Red',
        ndreValue: satelliteData.ndre,
      },
      pestRisk: {
        level: pestRisk.level,
        confidence: pestRisk.confidence,
      },
      diseaseRisk: {
        level: 'Moderate',
        confidence: 65,
      },
    },
  };
}

/**
 * Generate multiple farms
 */
function generateMockFarmsData(count = 5) {
  const farms = [];
  for (let i = 1; i <= count; i++) {
    farms.push(generateMockFarmData(`FARM-${String(i).padStart(3, '0')}`));
  }
  return farms;
}

/**
 * Generate historical data
 */
function generateMockHistoricalData(days = 30) {
  const data = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

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
}

/**
 * Generate alerts
 */
function generateMockAlerts() {
  return [
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
  ];
}

/**
 * Generate farmer feedback
 */
function generateMockFarmerFeedback() {
  return [
    {
      id: 'FB-001',
      farmId: 'FARM-001',
      alertId: 'ALERT-001',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      pestConfirmed: true,
      observations: 'Confirmed FAW on FARM-001',
      controlMeasuresTaken: 'Applied Bt spray',
    },
  ];
}

/**
 * Generate system stats
 */
function generateMockSystemStats() {
  return {
    totalMonitoredFarms: 145,
    activeAlerts: 8,
    resolvedAlerts: 312,
    modelConfidenceScore: 82.5,
    sensorsOnline: 287,
    sensorsOffline: 13,
    lastModelRetrain: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * Generate feature importance
 */
function generateMockFeatureImportance() {
  return [
    { feature: 'NDRE', importance: 28.5, description: 'Crop stress indicator' },
    { feature: 'Soil Moisture', importance: 22.3, description: 'Root environment condition' },
    { feature: 'Temperature', importance: 20.1, description: 'Pest development speed' },
    { feature: 'Humidity', importance: 18.2, description: 'Disease and pest survival' },
    { feature: 'Rain Pattern', importance: 6.8, description: 'Water availability' },
  ];
}

module.exports = {
  generateMockSensorData,
  generateMockSatelliteData,
  generateMockFarmData,
  generateMockFarmsData,
  generateMockHistoricalData,
  generateMockAlerts,
  generateMockFarmerFeedback,
  generateMockSystemStats,
  generateMockFeatureImportance,
};

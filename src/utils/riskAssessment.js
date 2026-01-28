/**
 * Risk Assessment Logic
 * Calculates overall pest and disease risk based on multiple indicators
 */

import {
  classifyNDRE,
  classifySoilMoisture,
  classifyTemperature,
  classifyHumidity,
  PEST_RISK_MODELS,
} from './indicators';

// Risk Level Hierarchy
const RISK_LEVEL_PRIORITY = {
  'Low': 1,
  'Moderate': 2,
  'Medium': 2,
  'High': 3,
  'Very High': 4,
};

/**
 * Calculate overall crop health based on NDRE value
 */
export const calculateCropHealth = (ndreValue) => {
  const ndreClass = classifyNDRE(ndreValue);
  const riskLevel = ndreClass.riskLevel;

  return {
    status: ndreClass.description,
    riskLevel: riskLevel,
    ndreValue: ndreValue,
    color: riskLevel === 'Low' ? 'Green' : riskLevel === 'Moderate' ? 'Yellow' : 'Red',
    explanation: ndreClass.explanation,
  };
};

/**
 * Assess pest risk based on multiple environmental indicators
 */
export const assessPestRisk = (indicators) => {
  const {
    ndre = 0.3,
    soilMoisture = 50,
    temperature = 22,
    humidity = 60,
  } = indicators;

  // Classify each indicator
  const ndreClass = classifyNDRE(ndre);
  const moistureClass = classifySoilMoisture(soilMoisture);
  const tempClass = classifyTemperature(temperature);
  const humidityClass = classifyHumidity(humidity);

  // Get risk priority values
  const ndreRiskPriority = RISK_LEVEL_PRIORITY[ndreClass.riskLevel] || 1;
  const moistureRiskPriority = RISK_LEVEL_PRIORITY[moistureClass.riskLevel] || 1;
  const tempRiskPriority = RISK_LEVEL_PRIORITY[tempClass.riskLevel] || 1;
  const humidityRiskPriority = RISK_LEVEL_PRIORITY[humidityClass.riskLevel] || 1;

  // Calculate overall pest risk as average of all indicators
  const avgRiskPriority = (ndreRiskPriority + moistureRiskPriority + tempRiskPriority + humidityRiskPriority) / 4;

  let overallRiskLevel = 'Low';
  let riskColor = 'Green';
  
  if (avgRiskPriority < 2) {
    overallRiskLevel = 'Low';
    riskColor = 'Green';
  } else if (avgRiskPriority < 3) {
    overallRiskLevel = 'Moderate';
    riskColor = 'Yellow';
  } else {
    overallRiskLevel = 'High';
    riskColor = 'Red';
  }

  // Calculate confidence (0-100) based on how well indicators align
  const riskPriorities = [ndreRiskPriority, moistureRiskPriority, tempRiskPriority, humidityRiskPriority];
  const variance = riskPriorities.reduce((sum, val) => sum + Math.pow(val - avgRiskPriority, 2), 0) / 4;
  const standardDeviation = Math.sqrt(variance);
  const confidence = Math.max(50, 100 - standardDeviation * 15);

  return {
    overallRiskLevel,
    riskColor,
    confidence: Math.round(confidence),
    indicators: {
      ndre: ndreClass,
      soilMoisture: moistureClass,
      temperature: tempClass,
      humidity: humidityClass,
    },
    rawValues: {
      ndre,
      soilMoisture,
      temperature,
      humidity,
    },
  };
};

/**
 * Predict active pest threats based on environmental conditions
 */
export const predictActivePests = (indicators) => {
  const pestRisks = [];

  const {
    ndre = 0.3,
    soilMoisture = 50,
    temperature = 22,
    humidity = 60,
  } = indicators;

  const ndreClass = classifyNDRE(ndre);
  const moistureClass = classifySoilMoisture(soilMoisture);
  const tempClass = classifyTemperature(temperature);
  const humidityClass = classifyHumidity(humidity);

  // Check each pest model
  Object.entries(PEST_RISK_MODELS).forEach(([pestKey, pest]) => {
    let matchScore = 0;
    let maxScore = 0;

    // Score based on matching indicators
    pest.indicators.forEach((indConfig) => {
      maxScore++;

      if (indConfig.indicator === 'NDRE') {
        if (indConfig.severeStress && ndre < 0.05) {
          matchScore += 2; // Very strong match
        } else if (indConfig.moderateStress && ndre >= 0.05 && ndre < 0.15) {
          matchScore += 1.5;
        } else if (indConfig.mildStress && ndre >= 0.15 && ndre < 0.25) {
          matchScore += 1;
        }
      } else if (indConfig.indicator === 'Soil Moisture') {
        if (indConfig.lowMoisture && soilMoisture < 40) {
          matchScore += 2;
        } else if (indConfig.moderateMoisture && soilMoisture >= 40 && soilMoisture < 70) {
          matchScore += 1;
        }
      } else if (indConfig.indicator === 'Temperature') {
        if (indConfig.veryHigh && temperature > 35) {
          matchScore += 2;
        } else if (indConfig.high && temperature >= 25 && temperature < 30) {
          matchScore += 1.5;
        } else if (indConfig.moderate && temperature >= 15 && temperature < 25) {
          matchScore += 1;
        }
      } else if (indConfig.indicator === 'Humidity') {
        if (indConfig.low && humidity < 50) {
          matchScore += 1;
        } else if (indConfig.medium && humidity >= 50 && humidity < 70) {
          matchScore += 1;
        } else if (indConfig.high && humidity >= 70) {
          matchScore += 0.5;
        }
      }
    });

    // Calculate risk probability
    const riskProbability = (matchScore / (maxScore * 2)) * 100;

    if (riskProbability > 20) {
      // Only include pests with meaningful risk
      let riskLevel = 'Low';
      if (riskProbability > 70) {
        riskLevel = 'Very High';
      } else if (riskProbability > 55) {
        riskLevel = 'High';
      } else if (riskProbability > 35) {
        riskLevel = 'Moderate';
      }

      pestRisks.push({
        pestKey,
        pestName: pest.name,
        timeWindow: pest.timeWindow,
        riskLevel,
        probability: Math.round(riskProbability),
        scoutingAdvice: pest.scoutingAdvice,
        preventionSteps: pest.preventionSteps,
        controlReadiness: pest.controlReadiness,
      });
    }
  });

  // Sort by probability descending
  return pestRisks.sort((a, b) => b.probability - a.probability);
};

/**
 * Calculate disease risk based on environmental conditions
 * (placeholder - can be expanded with disease models)
 */
export const calculateDiseaseRisk = (indicators) => {
  const {
    soilMoisture = 50,
    humidity = 60,
    temperature = 22,
  } = indicators;

  let diseaseRiskLevel = 'Low';
  let confidence = 60;

  // High humidity and moderate temperature favor fungal diseases
  if (humidity > 70 && temperature > 15 && temperature < 28) {
    diseaseRiskLevel = 'Moderate';
    confidence = 75;
  }

  // Very high humidity with moderate soil moisture creates perfect disease environment
  if (humidity >= 70 && soilMoisture >= 40 && soilMoisture <= 70) {
    diseaseRiskLevel = 'High';
    confidence = 85;
  }

  // Dry conditions with low humidity reduce disease risk
  if (humidity < 50 && soilMoisture < 40) {
    diseaseRiskLevel = 'Low';
    confidence = 80;
  }

  return {
    diseaseRiskLevel,
    confidence,
    reason: getDiseaseRiskReason(humidity, soilMoisture, temperature),
  };
};

/**
 * Get human-readable explanation for disease risk
 */
const getDiseaseRiskReason = (humidity, soilMoisture, temperature) => {
  const factors = [];

  if (humidity > 70) {
    factors.push('High humidity favors fungal diseases');
  }
  if (humidity < 50) {
    factors.push('Low humidity reduces disease pressure');
  }
  if (temperature > 20 && temperature < 28) {
    factors.push('Moderate temperature supports disease development');
  }
  if (soilMoisture > 70) {
    factors.push('Excess soil moisture increases root disease risk');
  }

  return factors.length > 0 ? factors.join('; ') : 'Conditions are neutral for disease development';
};

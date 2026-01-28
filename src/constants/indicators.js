/**
 * Indicator Classification System
 * Based on NDRE, Soil Moisture, Temperature, and Humidity ranges
 * From Excel analysis: convertcsv (5).xlsx and convertcsv (7).xlsx
 */

// NDRE (Normalized Difference Red Edge Index) Classifications
export const NDRE_CLASSIFICATIONS = {
  VERY_HEALTHY: {
    range: '>0.45',
    minValue: 0.45,
    maxValue: 1.0,
    riskLevel: 'Low',
    description: 'Very Healthy',
    traditionalIndicator: 'Lush green leaves; vigorous crop',
    explanation: 'Crop tissues are strong and unattractive to early pest feeding',
  },
  HEALTHY: {
    range: '0.25–0.45',
    minValue: 0.25,
    maxValue: 0.45,
    riskLevel: 'Low',
    description: 'Healthy',
    traditionalIndicator: 'Normal leaf color and growth',
    explanation: 'Crop growth balanced; pests unlikely to establish',
  },
  MILD_STRESS: {
    range: '0.15–0.25',
    minValue: 0.15,
    maxValue: 0.25,
    riskLevel: 'Moderate',
    description: 'Mild Stress',
    traditionalIndicator: 'Leaves slightly pale; early curling',
    explanation: 'Early sap extraction stress before visible damage',
    pestsAtRisk: ['Aphids', 'Thrips'],
  },
  MODERATE_STRESS: {
    range: '0.05–0.15',
    minValue: 0.05,
    maxValue: 0.15,
    riskLevel: 'High',
    description: 'Moderate Stress',
    traditionalIndicator: 'Visible leaf curling without holes',
    explanation: 'Active sap-feeding pests weakening plant defenses',
    pestsAtRisk: ['Aphids', 'Leafhoppers'],
  },
  SEVERE_STRESS: {
    range: '<0.05',
    minValue: 0,
    maxValue: 0.05,
    riskLevel: 'Very High',
    description: 'Severe Stress',
    traditionalIndicator: 'Rapid discoloration and plant weakening',
    explanation: 'Heavy feeding pressure and plant collapse risk',
    pestsAtRisk: ['Fall Armyworm', 'Aphids'],
  },
};

// Soil Moisture Classifications
export const SOIL_MOISTURE_CLASSIFICATIONS = {
  LOW_MOISTURE: {
    range: '<40%',
    minValue: 0,
    maxValue: 40,
    riskLevel: 'Very High',
    description: 'Low Moisture',
    traditionalIndicator: 'Dry cracked soil; increased termite activity',
    explanation: 'Dry soils favor termites and root-feeding pests',
    pestsAtRisk: ['Termites', 'Cutworms', 'Root beetles'],
  },
  MODERATE_MOISTURE: {
    range: '40–70%',
    minValue: 40,
    maxValue: 70,
    riskLevel: 'Medium',
    description: 'Moderate Moisture',
    traditionalIndicator: 'Soil moist but surface drying',
    explanation: 'Optimal conditions for egg hatching and larval survival',
    pestsAtRisk: ['Armyworms', 'FAW'],
  },
  HIGH_MOISTURE: {
    range: '>70%',
    minValue: 70,
    maxValue: 100,
    riskLevel: 'Low',
    description: 'High Moisture',
    traditionalIndicator: 'Consistently moist soil',
    explanation: 'Excess moisture limits soil pest survival',
    pestsAtRisk: [],
  },
};

// Temperature Classifications (in Celsius)
export const TEMPERATURE_CLASSIFICATIONS = {
  LOW: {
    range: '<15°C',
    minValue: -273,
    maxValue: 15,
    riskLevel: 'Low',
    description: 'Low',
    traditionalIndicator: 'Cool nights; dew present',
    explanation: 'Low insect metabolism slows reproduction',
    pestsAtRisk: [],
  },
  MODERATE: {
    range: '15–25°C',
    minValue: 15,
    maxValue: 25,
    riskLevel: 'Medium',
    description: 'Moderate',
    traditionalIndicator: 'Warm days and mild nights',
    explanation: 'Favorable conditions for gradual pest buildup',
    pestsAtRisk: ['Aphids', 'Thrips'],
  },
  HIGH: {
    range: '25–30°C',
    minValue: 25,
    maxValue: 30,
    riskLevel: 'High',
    description: 'High',
    traditionalIndicator: 'Hot days; warm nights',
    explanation: 'Accelerated pest life cycles and feeding',
    pestsAtRisk: ['Fall Armyworm', 'Leafhoppers'],
  },
  VERY_HIGH: {
    range: '>35°C',
    minValue: 35,
    maxValue: 60,
    riskLevel: 'Very High',
    description: 'Very High',
    traditionalIndicator: 'Extreme heat; plant stress visible',
    explanation: 'Heat-stressed crops lose defense capacity',
    pestsAtRisk: ['Thrips', 'Aphids', 'FAW'],
  },
};

// Humidity Classifications
export const HUMIDITY_CLASSIFICATIONS = {
  LOW: {
    range: '<50%',
    minValue: 0,
    maxValue: 50,
    riskLevel: 'High',
    description: 'Low',
    traditionalIndicator: 'Dry air; leaf curling',
    explanation: 'Dry conditions favor sap-feeding insects',
    pestsAtRisk: ['Aphids', 'Thrips'],
  },
  MEDIUM: {
    range: '50–70%',
    minValue: 50,
    maxValue: 70,
    riskLevel: 'Medium',
    description: 'Medium',
    traditionalIndicator: 'Balanced air moisture',
    explanation: 'Supports moderate pest development',
    pestsAtRisk: ['Stem borers', 'FAW'],
  },
  HIGH: {
    range: '≥70%',
    minValue: 70,
    maxValue: 100,
    riskLevel: 'Low',
    description: 'High',
    traditionalIndicator: 'Humid mornings; dew formation',
    explanation: 'High humidity suppresses some pests',
    pestsAtRisk: [],
  },
};

// Pest Risk Models
export const PEST_RISK_MODELS = {
  FAW: {
    name: 'Fall Armyworm (FAW)',
    timeWindow: '7–10 days',
    indicators: [
      { indicator: 'NDRE', severeStress: { range: '<0.05', riskLevel: 'Very High' }, moderateStress: { range: '0.05-0.15', riskLevel: 'High' } },
      { indicator: 'Soil Moisture', lowMoisture: { range: '<40%', riskLevel: 'Very High' }, moderateMoisture: { range: '40-70%', riskLevel: 'Medium' } },
      { indicator: 'Temperature', high: { range: '25-30°C', riskLevel: 'High' }, veryHigh: { range: '>35°C', riskLevel: 'Very High' } },
      { indicator: 'Humidity', medium: { range: '50-70%', riskLevel: 'Medium' } },
    ],
    scoutingAdvice: 'Check leaf whorls for FAW eggs and early larvae. Look for light tan-colored masses and small holes on leaves.',
    preventionSteps: 'Remove crop residues, practice crop rotation, early scouting critical.',
    controlReadiness: 'Prepare bio-pesticides (Bt) or approved chemical controls. Ensure spraying equipment ready.',
  },
  APHIDS: {
    name: 'Aphids',
    timeWindow: '5–7 days',
    indicators: [
      { indicator: 'NDRE', mildStress: { range: '0.15-0.25', riskLevel: 'Moderate' }, moderateStress: { range: '0.05-0.15', riskLevel: 'High' } },
      { indicator: 'Temperature', moderate: { range: '15-25°C', riskLevel: 'Medium' }, high: { range: '25-30°C', riskLevel: 'High' } },
      { indicator: 'Humidity', low: { range: '<50%', riskLevel: 'High' } },
    ],
    scoutingAdvice: 'Check undersides of leaves for aphid colonies. Look for curled leaves and sticky honeydew.',
    preventionSteps: 'Encourage natural predators. Use reflective mulches. Manage nitrogen fertilizer.',
    controlReadiness: 'Insecticidal soap or neem oil. Prepare for spray application.',
  },
  STEM_BORERS: {
    name: 'Stem Borers',
    timeWindow: '10–14 days',
    indicators: [
      { indicator: 'NDRE', moderateStress: { range: '0.05-0.15', riskLevel: 'High' }, severeStress: { range: '<0.05', riskLevel: 'Very High' } },
      { indicator: 'Humidity', medium: { range: '50-70%', riskLevel: 'Medium' } },
      { indicator: 'Temperature', moderate: { range: '15-25°C', riskLevel: 'Medium' } },
    ],
    scoutingAdvice: 'Look for sawdust-like frass at stem entry holes. Check for uneven crop growth and wilting.',
    preventionSteps: 'Use resistant varieties. Practice good field sanitation. Remove infested plant parts.',
    controlReadiness: 'Stem borers inside plants are hard to control. Focus on prevention and early detection.',
  },
  THRIPS: {
    name: 'Thrips',
    timeWindow: '5–8 days',
    indicators: [
      { indicator: 'NDRE', mildStress: { range: '0.15-0.25', riskLevel: 'Moderate' } },
      { indicator: 'Temperature', high: { range: '25-30°C', riskLevel: 'High' }, veryHigh: { range: '>35°C', riskLevel: 'Very High' } },
      { indicator: 'Humidity', low: { range: '<50%', riskLevel: 'High' } },
    ],
    scoutingAdvice: 'Look for silvering of leaves. Check for fine webbing and small holes.',
    preventionSteps: 'Maintain adequate soil moisture. Use yellow sticky traps. Spray water to increase humidity.',
    controlReadiness: 'Insecticidal sprays. Regular scouting and timely intervention critical.',
  },
  TERMITES: {
    name: 'Termites',
    timeWindow: '14–21 days',
    indicators: [
      { indicator: 'Soil Moisture', lowMoisture: { range: '<40%', riskLevel: 'Very High' } },
      { indicator: 'Temperature', high: { range: '25-30°C', riskLevel: 'High' } },
    ],
    scoutingAdvice: 'Look for termite mounds and hollowed stalks. Check for termite tunnels.',
    preventionSteps: 'Remove termite mounds pre-season. Plant barrier crops. Manage soil moisture.',
    controlReadiness: 'Limited in-season control. Focus on prevention and field preparation.',
  },
  CUTWORMS: {
    name: 'Cutworms',
    timeWindow: '7–10 days',
    indicators: [
      { indicator: 'Soil Moisture', lowMoisture: { range: '<40%', riskLevel: 'Very High' } },
      { indicator: 'Temperature', moderate: { range: '15-25°C', riskLevel: 'Medium' } },
    ],
    scoutingAdvice: 'Look for cut plants at soil level. Search for cutworm larvae in soil during early morning.',
    preventionSteps: 'Remove field residues. Dig barrier trenches. Use cardboard collars around seedlings.',
    controlReadiness: 'Apply granular insecticides. Hand-pick larvae if infestation small.',
  },
};

// Risk Level Color Mapping
export const RISK_COLORS = {
  'Low': '#10B981', // Green
  'Moderate': '#F59E0B', // Amber
  'High': '#EF4444', // Red
  'Very High': '#991B1B', // Dark Red
  'Medium': '#F59E0B', // Amber (same as Moderate)
};

// Color utilities
export const getRiskColor = (riskLevel) => {
  return RISK_COLORS[riskLevel] || '#6B7280'; // Gray fallback
};

export const getRiskColorClass = (riskLevel) => {
  const colorMap = {
    'Low': 'bg-green-100 border-green-500 text-green-800',
    'Moderate': 'bg-amber-100 border-amber-500 text-amber-800',
    'High': 'bg-red-100 border-red-500 text-red-800',
    'Very High': 'bg-red-900 border-red-700 text-red-100',
    'Medium': 'bg-amber-100 border-amber-500 text-amber-800',
  };
  return colorMap[riskLevel] || 'bg-gray-100 border-gray-500 text-gray-800';
};

// Classify NDRE value
export const classifyNDRE = (ndreValue) => {
  if (ndreValue > 0.45) return NDRE_CLASSIFICATIONS.VERY_HEALTHY;
  if (ndreValue > 0.25) return NDRE_CLASSIFICATIONS.HEALTHY;
  if (ndreValue > 0.15) return NDRE_CLASSIFICATIONS.MILD_STRESS;
  if (ndreValue > 0.05) return NDRE_CLASSIFICATIONS.MODERATE_STRESS;
  return NDRE_CLASSIFICATIONS.SEVERE_STRESS;
};

// Classify Soil Moisture
export const classifySoilMoisture = (moisturePercent) => {
  if (moisturePercent < 40) return SOIL_MOISTURE_CLASSIFICATIONS.LOW_MOISTURE;
  if (moisturePercent < 70) return SOIL_MOISTURE_CLASSIFICATIONS.MODERATE_MOISTURE;
  return SOIL_MOISTURE_CLASSIFICATIONS.HIGH_MOISTURE;
};

// Classify Temperature
export const classifyTemperature = (tempCelsius) => {
  if (tempCelsius < 15) return TEMPERATURE_CLASSIFICATIONS.LOW;
  if (tempCelsius < 25) return TEMPERATURE_CLASSIFICATIONS.MODERATE;
  if (tempCelsius < 30) return TEMPERATURE_CLASSIFICATIONS.HIGH;
  return TEMPERATURE_CLASSIFICATIONS.VERY_HIGH;
};

// Classify Humidity
export const classifyHumidity = (humidityPercent) => {
  if (humidityPercent < 50) return HUMIDITY_CLASSIFICATIONS.LOW;
  if (humidityPercent < 70) return HUMIDITY_CLASSIFICATIONS.MEDIUM;
  return HUMIDITY_CLASSIFICATIONS.HIGH;
};

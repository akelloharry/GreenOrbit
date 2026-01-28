# GreenOrbit Dashboard - Developer Quick Reference

## 🚀 Quick Start (5 minutes)

```bash
cd greenorbit-dashboard
npm install
npm run dev
```

Then open `http://localhost:3000` and log in with:
- **Farmer**: farmer@example.com / password123
- **Admin**: admin@example.com / password123

---

## 📁 File Structure Quick Navigation

### Core Components
```
src/components/farmer/              # All farmer dashboard components
├── HomeSummaryCard.jsx             # Status overview
├── EarlyWarningAlertCard.jsx        # Pest threat display
├── ExplainableAIPanel.jsx           # Indicator breakdown
├── WhatToDoPanel.jsx                # Action guidance
└── RealTimeSensorStatus.jsx         # Live sensor readings
```

### State Management
```
src/context/AuthContext.jsx          # User & role management
src/routing/AppRouter.jsx            # Route configuration
```

### Data & Logic
```
src/constants/indicators.js          # All indicator classifications
src/utils/riskAssessment.js         # Risk calculation engine
src/utils/mockData.js               # Client mock data
```

### Backend
```
server/index.js                      # Express + WebSocket
server/mockDataGenerator.js          # Server mock data
```

---

## 🔑 Key Constants & Functions

### Indicator Classifications
```javascript
import { 
  NDRE_CLASSIFICATIONS,
  SOIL_MOISTURE_CLASSIFICATIONS,
  TEMPERATURE_CLASSIFICATIONS,
  HUMIDITY_CLASSIFICATIONS,
  PEST_RISK_MODELS
} from '../constants/indicators'
```

### Risk Assessment Functions
```javascript
import {
  assessPestRisk,           // Calculate overall pest risk
  predictActivePests,       // Get list of threats
  calculateDiseaseRisk      // Disease risk calculation
} from '../utils/riskAssessment'
```

### Mock Data
```javascript
import {
  generateMockFarmData,     // Single farm
  generateMockFarmsData,    // Multiple farms
  generateMockSensorData,   // Real-time sensor readings
  generateMockAlerts        // Active alerts
} from '../utils/mockData'
```

---

## 🔌 Common API Calls

### Fetch Farm Data
```javascript
const response = await fetch('/api/farms/FARM-001')
const { data: farm } = await response.json()
// farm.riskAssessment.activePests
// farm.sensorData.temperature
// farm.satelliteData.ndre
```

### Get Alerts
```javascript
const response = await fetch('/api/alerts')
const { data: alerts } = await response.json()
// Filter by farmId, status, risk level
```

### WebSocket Subscription
```javascript
const ws = new WebSocket('ws://localhost:5000')
ws.send(JSON.stringify({
  type: 'subscribe',
  farmId: 'FARM-001'
}))
// Receives messages every 10 seconds
```

---

## 🎨 Tailwind CSS Quick Reference

### Color Classes
```
Green (Low Risk):    bg-green-500, text-green-700, border-green-600
Yellow (Moderate):   bg-yellow-500, text-yellow-700, border-yellow-600
Red (High):          bg-red-500, text-red-700, border-red-600
Dark Red (V.High):   bg-red-900, text-red-100, border-red-900
```

### Common Patterns
```jsx
// Card
<div className="bg-white rounded-lg shadow p-6">

// Header
<div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">

// Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">

// Grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Alert Box
<div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
```

---

## 🐛 Common Debugging Tips

### Check WebSocket Connection
```javascript
// In browser console
ws.readyState
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED
```

### View Mock Data
```javascript
import { generateMockFarmData } from './utils/mockData'
const farm = generateMockFarmData('FARM-001')
console.log(farm)
```

### Test Risk Assessment
```javascript
import { assessPestRisk } from './utils/riskAssessment'
const risk = assessPestRisk({
  ndre: 0.15,
  soilMoisture: 45,
  temperature: 28,
  humidity: 65
})
console.log(risk.overallRiskLevel)
```

---

## 📊 Component Prop Interfaces

### HomeSummaryCard
```javascript
<HomeSummaryCard 
  farmData={{
    riskAssessment: {
      cropHealth: { status, color, ndreValue },
      pestRisk: { level, confidence },
      diseaseRisk: { level, confidence }
    }
  }}
/>
```

### EarlyWarningAlertCard
```javascript
<EarlyWarningAlertCard 
  pest={{
    pestName: 'Fall Armyworm',
    riskLevel: 'High',
    probability: 78,
    timeWindow: '7–10 days',
    scoutingAdvice: '...',
    preventionSteps: '...',
    controlReadiness: '...'
  }}
/>
```

### RealTimeSensorStatus
```javascript
<RealTimeSensorStatus 
  sensorData={{
    soilMoisture: 45.5,
    temperature: 24.3,
    humidity: 62.1,
    lastUpdate: '2024-01-28T...'
  }}
  wsConnected={true}
/>
```

---

## 🔐 Authentication Flow

```javascript
// Login
const { user, token } = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password, role })
}).then(r => r.json())

// Use in protected routes
{isAuthenticated && hasRole('farmer') && <FarmerDashboard />}

// Logout
logout()  // Clears localStorage and context
```

---

## 📈 Risk Calculation Formula

```
Overall Risk = Average of (NDRE Risk + Moisture Risk + Temp Risk + Humidity Risk)
               × Confidence Score (based on indicator alignment)

Confidence = 100 - (Standard Deviation × 15)
```

---

## 🌍 Adding a New Pest

1. **Add to PEST_RISK_MODELS** in `src/constants/indicators.js`:
```javascript
YELLOW_LEAF_ROLLER: {
  name: 'Yellow Leaf Roller',
  timeWindow: '10–14 days',
  indicators: [
    { indicator: 'NDRE', mildStress: {...} },
    { indicator: 'Humidity', high: {...} }
  ],
  scoutingAdvice: '...',
  preventionSteps: '...',
  controlReadiness: '...'
}
```

2. **Update `predictActivePests()`** in `src/utils/riskAssessment.js` to include matching logic

3. **Test**:
```javascript
const pests = predictActivePests({
  ndre: 0.2,
  soilMoisture: 60,
  temperature: 25,
  humidity: 75
})
```

---

## 🛠️ Adding a New Dashboard Section

### In FarmerDashboard.jsx:
```javascript
<div className="bg-white rounded-lg shadow p-6">
  <div className="border-b pb-4 mb-4">
    <h2 className="text-xl font-bold">New Section Title</h2>
  </div>
  <div className="space-y-4">
    {/* Your content */}
  </div>
</div>
```

### In AdminDashboard.jsx:
```javascript
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Section</h2>
    {/* Content */}
  </div>
</div>
```

---

## 📝 Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
NODE_ENV=development
PORT=5000
```

Access in code:
```javascript
const apiUrl = process.env.REACT_APP_API_URL
const wsUrl = process.env.REACT_APP_WS_URL
```

---

## 🧪 Testing with Different Data

### Simulate High Risk
```javascript
const highRiskData = {
  ndre: 0.04,           // Severe stress
  soilMoisture: 35,     // Low
  temperature: 38,      // Very high
  humidity: 45          // Low
}
```

### Simulate Low Risk
```javascript
const lowRiskData = {
  ndre: 0.50,           // Very healthy
  soilMoisture: 55,     // Moderate
  temperature: 22,      // Moderate
  humidity: 60          // Medium
}
```

---

## 📚 Key Excel Data References

**From convertcsv (5).xlsx:**
- Indicator ranges and risk levels
- Traditional farmer indicators mapping
- Associated pests for each condition

**From convertcsv (7).xlsx:**
- Pest-specific indicator requirements
- Why each indicator matters for each pest
- Confidence thresholds

---

## 🚀 Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Update API URLs (remove localhost)
- [ ] Enable HTTPS
- [ ] Setup database (replace mocks)
- [ ] Configure CORS properly
- [ ] Setup authentication (JWT)
- [ ] Enable rate limiting
- [ ] Setup error logging (Sentry)
- [ ] Optimize images
- [ ] Minify code (auto with build)
- [ ] Setup CDN
- [ ] Test all flows

---

## 💡 Pro Tips

1. **Use React DevTools** to inspect component state
2. **Console.log the mock data** to understand structure
3. **Modify generateMockFarmData()** to test different scenarios
4. **Update PEST_RISK_MODELS** to adjust thresholds
5. **Use mock WebSocket** messages to test real-time updates
6. **Disable WebSocket** in development if latency issues

---

## 📞 Common Issues & Solutions

**Issue: Components not updating with WebSocket data**
- Solution: Check if component has proper state setter
- Solution: Verify WebSocket is subscribed to correct farmId

**Issue: Risk level not calculating correctly**
- Solution: Check indicator classification values
- Solution: Verify pest model thresholds

**Issue: CORS errors**
- Solution: Backend has `cors()` middleware
- Solution: Check origin in CORS config

**Issue: Mock data same every time**
- Solution: Mock generators use Math.random()
- Solution: Refresh page to get new data

---

## 📖 Useful Shortcuts

```javascript
// Quick risk check
assessPestRisk({ndre: 0.1, soilMoisture: 40, temperature: 28, humidity: 60})

// Get all pests at risk
predictActivePests({ndre: 0.2, soilMoisture: 45, temperature: 25, humidity: 65})

// Check single indicator
classifyNDRE(0.15)
classifySoilMoisture(45)
classifyTemperature(26)
classifyHumidity(70)
```

---

## 🎓 Learning Path

1. Start with `README.md` for overview
2. Read `IMPLEMENTATION_SUMMARY.md` for architecture
3. Review `src/constants/indicators.js` for data model
4. Study `src/pages/farmer/FarmerDashboard.jsx` for main flow
5. Check `src/components/farmer/*.jsx` for UI patterns
6. Review `server/index.js` for API
7. Test with different data scenarios

---

**Happy Coding! 🚀**

Questions? Check the documentation files or review component source code.

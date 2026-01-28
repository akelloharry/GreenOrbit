# GreenOrbit Early Warning Dashboard

Production-ready web-based early warning dashboard for maize pest and disease prediction.

## Features

### Farmer Dashboard
- **Home Summary Card**: Real-time crop health, pest risk, disease risk with confidence scores
- **Early Warning Alerts**: Pest/disease predictions with expected timeframes
- **Interactive Map**: Farm boundary visualization with risk zones
- **Explainable AI Panel**: Transparent indicator analysis (NDRE, Soil Moisture, Temperature, Humidity)
- **What To Do Panel**: Actionable scouting and prevention advice
- **Real-Time Sensors**: Live IoT sensor data with 24-hour trends

### Admin Dashboard
- **System Overview**: Farm count, active alerts, model confidence, sensor status
- **Data Monitoring**: Real-time trends for NDVI/NDRE/NDWI, temperature, humidity, soil moisture
- **Model Management**: Feature importance, risk thresholds, model retraining
- **Alert Management**: Active/resolved alert tracking with history
- **Farmer Feedback**: Photo uploads, pest confirmations, false positive flags

## Tech Stack

### Frontend
- React 18 with Hooks
- React Router v6 for navigation
- Tailwind CSS for styling
- React Hot Toast for notifications
- Context API for state management

### Backend
- Node.js + Express.js
- WebSocket (ws) for real-time updates
- CORS enabled
- Mock data generators

### Data & AI
- Indicator thresholds from Excel analysis
- Risk classification logic based on NDRE, Soil Moisture, Temperature, Humidity
- Pest-specific risk models for 7 major maize pests
- Confidence scoring system

## Project Structure

```
greenorbit-dashboard/
├── public/
│   └── index.html
├── server/
│   ├── index.js                 # Express server & WebSocket
│   └── mockDataGenerator.js     # Server-side mock data
├── src/
│   ├── components/
│   │   └── farmer/
│   │       ├── FarmerNav.jsx
│   │       ├── HomeSummaryCard.jsx
│   │       ├── EarlyWarningAlertCard.jsx
│   │       ├── MapView.jsx
│   │       ├── ExplainableAIPanel.jsx
│   │       ├── WhatToDoPanel.jsx
│   │       └── RealTimeSensorStatus.jsx
│   ├── constants/
│   │   └── indicators.js        # All indicator classifications from Excel
│   ├── context/
│   │   └── AuthContext.jsx      # User authentication & role management
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── farmer/
│   │   │   ├── FarmerDashboard.jsx
│   │   │   └── FarmDetail.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── ModelManagement.jsx
│   │       └── AlertManagement.jsx
│   ├── routing/
│   │   └── AppRouter.jsx        # Role-based routing
│   ├── utils/
│   │   ├── riskAssessment.js    # Risk calculation logic
│   │   └── mockData.js          # Client-side mock data
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Quick Start

### Installation

```bash
cd greenorbit-dashboard
npm install
```

### Development

```bash
# Run both frontend and backend
npm run dev

# Or separately:
npm start          # Frontend on port 3000
npm run backend    # Backend on port 5000
```

### Production Build

```bash
npm run build
```

## Demo Credentials

### Farmer
- Email: `farmer@example.com`
- Password: `password123`

### Admin
- Email: `admin@example.com`
- Password: `password123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Farms
- `GET /api/farms` - Get all monitored farms
- `GET /api/farms/:farmId` - Get specific farm data

### Alerts
- `GET /api/alerts` - Get all active alerts
- `GET /api/alerts/:farmId` - Get farm-specific alerts

### Historical Data
- `GET /api/historical-data/:farmId?days=30` - Get historical sensor/satellite data

### Admin
- `GET /api/admin/stats` - System overview statistics
- `GET /api/admin/feature-importance` - ML model feature importance

## WebSocket Connections

Real-time sensor data updates via WebSocket:

```javascript
// Subscribe to farm updates
ws.send(JSON.stringify({ type: 'subscribe', farmId: 'FARM-001' }));

// Receive updates every 10 seconds
// Message format:
// {
//   type: 'sensor-update',
//   farmId: 'FARM-001',
//   data: {
//     soilMoisture: 45.5,
//     temperature: 24.3,
//     humidity: 62.1,
//     lastUpdate: '2024-01-28T...'
//   }
// }
```

## Indicator Classifications

### NDRE (Normalized Difference Red Edge Index)
- **Very Healthy** (>0.45): Low Risk
- **Healthy** (0.25-0.45): Low Risk
- **Mild Stress** (0.15-0.25): Moderate Risk - Aphids, Thrips
- **Moderate Stress** (0.05-0.15): High Risk - Aphids, Leafhoppers
- **Severe Stress** (<0.05): Very High Risk - FAW, Aphids

### Soil Moisture
- **Low** (<40%): Very High Risk - Termites, Cutworms
- **Moderate** (40-70%): Medium Risk - Armyworms, FAW
- **High** (>70%): Low Risk

### Temperature (°C)
- **Low** (<15): Low Risk
- **Moderate** (15-25): Medium Risk - Aphids, Thrips
- **High** (25-30): High Risk - FAW, Leafhoppers
- **Very High** (>35): Very High Risk - Thrips, Aphids, FAW

### Humidity
- **Low** (<50%): High Risk - Aphids, Thrips
- **Medium** (50-70%): Medium Risk - Stem borers, FAW
- **High** (≥70%): Low Risk

## Pest Risk Models

Coverage for:
1. **Fall Armyworm (FAW)** - 7-10 day window
2. **Aphids** - 5-7 day window
3. **Stem Borers** - 10-14 day window
4. **Thrips** - 5-8 day window
5. **Termites** - 14-21 day window
6. **Cutworms** - 7-10 day window
7. **African Armyworm** - Risk based on moisture & temperature

## Key Features

✅ Mobile-first design for farmers  
✅ Desktop-optimized admin interface  
✅ Real-time sensor data streaming  
✅ Explainable AI with indicator breakdown  
✅ Farmer-friendly simple language  
✅ Role-based access control  
✅ Production-ready code structure  
✅ Comprehensive documentation  

## Future Enhancements

- Interactive Leaflet/Mapbox maps with risk zones
- Photo upload and CNN-based pest identification
- SMS/Push notifications for alerts
- Farmer feedback validation system
- Historical analytics with Recharts
- Advanced model retraining UI
- Multi-language support (Swahili, others)
- Offline mode support

## License

MIT

## Contact & Support

For questions or support, contact the GreenOrbit team.

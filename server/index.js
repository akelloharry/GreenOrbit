/**
 * GreenOrbit Dashboard Backend Server
 * Production-ready Express.js server with WebSocket support
 */

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// Port configuration
const PORT = process.env.PORT || 5000;

/**
 * REST API Routes
 */

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * Authentication Routes (Mock Implementation)
 */

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;

  // Mock authentication
  if (email && password) {
    res.json({
      success: true,
      user: {
        id: `USER-${Math.random().toString(36).substr(2, 9)}`,
        email,
        role: role || 'farmer',
        name: 'User Name',
      },
      token: `token-${Math.random().toString(36).substr(2, 20)}`,
    });
  } else {
    res.status(400).json({ error: 'Email and password required' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true });
});

/**
 * Farm Routes
 */

app.get('/api/farms', (req, res) => {
  // Import mock data generator
  const { generateMockFarmsData } = require('./mockDataGenerator');
  const farms = generateMockFarmsData(10);
  res.json({ success: true, data: farms });
});

app.get('/api/farms/:farmId', (req, res) => {
  const { generateMockFarmData } = require('./mockDataGenerator');
  const farm = generateMockFarmData(req.params.farmId);
  res.json({ success: true, data: farm });
});

/**
 * Alerts Routes
 */

app.get('/api/alerts', (req, res) => {
  const { generateMockAlerts } = require('./mockDataGenerator');
  const alerts = generateMockAlerts();
  res.json({ success: true, data: alerts });
});

app.get('/api/alerts/:farmId', (req, res) => {
  const { generateMockAlerts } = require('./mockDataGenerator');
  const allAlerts = generateMockAlerts();
  const farmAlerts = allAlerts.filter((a) => a.farmId === req.params.farmId);
  res.json({ success: true, data: farmAlerts });
});

/**
 * Historical Data Routes
 */

app.get('/api/historical-data/:farmId', (req, res) => {
  const { generateMockHistoricalData } = require('./mockDataGenerator');
  const days = req.query.days || 30;
  const data = generateMockHistoricalData(parseInt(days));
  res.json({ success: true, data });
});

/**
 * System Stats Routes (Admin)
 */

app.get('/api/admin/stats', (req, res) => {
  const { generateMockSystemStats } = require('./mockDataGenerator');
  const stats = generateMockSystemStats();
  res.json({ success: true, data: stats });
});

app.get('/api/admin/feature-importance', (req, res) => {
  const { generateMockFeatureImportance } = require('./mockDataGenerator');
  const importance = generateMockFeatureImportance();
  res.json({ success: true, data: importance });
});

/**
 * Farmer Feedback Routes
 */

app.get('/api/farmer-feedback', (req, res) => {
  const { generateMockFarmerFeedback } = require('./mockDataGenerator');
  const feedback = generateMockFarmerFeedback();
  res.json({ success: true, data: feedback });
});

app.post('/api/farmer-feedback', (req, res) => {
  const { farmId, alertId, pestConfirmed, observations } = req.body;
  const feedback = {
    id: `FB-${Date.now()}`,
    farmId,
    alertId,
    timestamp: new Date().toISOString(),
    pestConfirmed,
    observations,
  };
  res.json({ success: true, data: feedback });
});

/**
 * WebSocket Connection Handler
 */

// Track connected clients by farm
const connectedClients = new Map();

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');

  // Send initial data
  ws.send(
    JSON.stringify({
      type: 'connection',
      message: 'Connected to GreenOrbit real-time server',
      timestamp: new Date().toISOString(),
    })
  );

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      // Subscribe to farm sensor updates
      if (data.type === 'subscribe') {
        const farmId = data.farmId;
        if (!connectedClients.has(farmId)) {
          connectedClients.set(farmId, new Set());
        }
        connectedClients.get(farmId).add(ws);
        ws.farmId = farmId;

        ws.send(
          JSON.stringify({
            type: 'subscribed',
            farmId,
            message: `Subscribed to updates for ${farmId}`,
          })
        );
      }

      // Unsubscribe
      if (data.type === 'unsubscribe') {
        if (ws.farmId && connectedClients.has(ws.farmId)) {
          connectedClients.get(ws.farmId).delete(ws);
        }
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    // Clean up subscriptions
    if (ws.farmId && connectedClients.has(ws.farmId)) {
      connectedClients.get(ws.farmId).delete(ws);
      if (connectedClients.get(ws.farmId).size === 0) {
        connectedClients.delete(ws.farmId);
      }
    }
    console.log('WebSocket client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

/**
 * Real-time Sensor Data Simulation
 */

const { generateMockSensorData } = require('./mockDataGenerator');

// Broadcast sensor updates every 10 seconds
setInterval(() => {
  const farms = ['FARM-001', 'FARM-002', 'FARM-003', 'FARM-004', 'FARM-005'];

  farms.forEach((farmId) => {
    if (connectedClients.has(farmId)) {
      const sensorData = generateMockSensorData();

      const message = {
        type: 'sensor-update',
        farmId,
        data: sensorData,
        timestamp: new Date().toISOString(),
      };

      // Broadcast to all subscribers of this farm
      connectedClients.get(farmId).forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }
  });
}, 10000);

/**
 * Error Handling
 */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

/**
 * Serve React app for all other routes
 */

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**
 * Start Server
 */

server.listen(PORT, () => {
  console.log(`\n🌍 GreenOrbit Dashboard Server Running`);
  console.log(`📡 REST API: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`\nEnvironment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n✅ Server ready to accept connections`);
});

module.exports = { app, server, wss };

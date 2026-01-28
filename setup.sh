#!/bin/bash

# GreenOrbit Dashboard - Quick Start Script
# This script sets up and runs the application

echo "================================"
echo "GreenOrbit Dashboard Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "To start development:"
echo ""
echo "Option 1: Run both frontend and backend together"
echo "  npm run dev"
echo ""
echo "Option 2: Run separately (in different terminals)"
echo "  Terminal 1: npm start        (Frontend - port 3000)"
echo "  Terminal 2: npm run backend  (Backend - port 5000)"
echo ""
echo "Demo Credentials:"
echo "  Farmer: farmer@example.com / password123"
echo "  Admin:  admin@example.com / password123"
echo ""
echo "Documentation:"
echo "  - README.md - Full documentation"
echo "  - SETUP_GUIDE.txt - Implementation details"
echo "  - IMPLEMENTATION_SUMMARY.md - Complete overview"
echo ""
echo "Happy coding! 🚀"

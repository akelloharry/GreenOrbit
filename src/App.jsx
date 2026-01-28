/**
 * Main App Component
 * Root component with providers and routing
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routing/AppRouter';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;

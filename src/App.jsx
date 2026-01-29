/**
 * Main App Component
 * Root component with providers and routing
 */

import React, { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routing/AppRouter';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded shadow m-8">
      <p className="font-bold">Something went wrong:</p>
      <pre className="text-xs whitespace-pre-wrap">{error.message}</pre>
      <button className="mt-2 px-3 py-1 bg-red-600 text-white rounded" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

/**
 * Application Routes with Role-Based Access Control
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Lazy load pages for code splitting
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const FarmerDashboard = React.lazy(() => import('../pages/farmer/FarmerDashboard'));
const FarmDetail = React.lazy(() => import('../pages/farmer/FarmDetail'));
const AdminDashboard = React.lazy(() => import('../pages/admin/AdminDashboard'));
const AdminModelManagement = React.lazy(() => import('../pages/admin/ModelManagement'));
const AdminAlerts = React.lazy(() => import('../pages/admin/AlertManagement'));

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ component: Component, requiredRole }) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Component />
    </React.Suspense>
  );
};

/**
 * Loading Spinner Component
 */
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
);

/**
 * Unauthorized Page
 */
const UnauthorizedPage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">401</h1>
      <p className="text-gray-600">You do not have permission to access this page</p>
    </div>
  </div>
);

/**
 * Main Router
 */
export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router basename="/GreenOrbit">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<React.Suspense fallback={<LoadingSpinner />}><LoginPage /></React.Suspense>} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Farmer Routes */}
        <Route
          path="/farmer/*"
          element={<ProtectedRoute component={FarmerDashboard} requiredRole="farmer" />}
        />
        <Route
          path="/farmer/farm/:farmId"
          element={<ProtectedRoute component={FarmDetail} requiredRole="farmer" />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={<ProtectedRoute component={AdminDashboard} requiredRole="admin" />}
        />
        <Route
          path="/admin/model-management"
          element={<ProtectedRoute component={AdminModelManagement} requiredRole="admin" />}
        />
        <Route
          path="/admin/alerts"
          element={<ProtectedRoute component={AdminAlerts} requiredRole="admin" />}
        />

        {/* Root redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/farmer" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;

/**
 * Application Routes with Role-Based Access Control
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Lazy load pages for code splitting
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const FarmerDashboard = React.lazy(() => import('../pages/farmer/FarmerDashboard'));
const RegisterFarmPage = React.lazy(() => import('../pages/farmer/RegisterFarmPage'));
const SubscriptionPage = React.lazy(() => import('../pages/farmer/SubscriptionPage'));
const UpgradeAccountPage = React.lazy(() => import('../pages/farmer/UpgradeAccountPage'));
const DeleteAccountPage = React.lazy(() => import('../pages/farmer/DeleteAccountPage'));
const AccountOverviewPage = React.lazy(() => import('../pages/farmer/AccountOverviewPage'));
  <Route path="/farmer/register" element={<ProtectedRoute component={RegisterFarmPage} requiredRole="farmer" />} />
  <Route path="/farmer/subscription" element={<ProtectedRoute component={SubscriptionPage} requiredRole="farmer" />} />
  <Route path="/farmer/upgrade" element={<ProtectedRoute component={UpgradeAccountPage} requiredRole="farmer" />} />
  <Route path="/farmer/delete" element={<ProtectedRoute component={DeleteAccountPage} requiredRole="farmer" />} />
  <Route path="/farmer/account" element={<ProtectedRoute component={AccountOverviewPage} requiredRole="farmer" />} />
const FarmDetail = React.lazy(() => import('../pages/farmer/FarmDetail'));
const AdminDashboard = React.lazy(() => import('../pages/admin/AdminDashboard'));
const AdminModelManagement = React.lazy(() => import('../pages/admin/ModelManagement'));
const AdminAlerts = React.lazy(() => import('../pages/admin/AlertManagement'));
const SensorsPage = React.lazy(() => import('../pages/admin/SensorsPage'));
const MonitoredFarmsPage = React.lazy(() => import('../pages/admin/MonitoredFarmsPage'));
const FeedbackPage = React.lazy(() => import('../pages/admin/FeedbackPage'));
const ReportsPage = React.lazy(() => import('../pages/admin/ReportsPage'));
const DataMonitoringPage = React.lazy(() => import('../pages/admin/DataMonitoringPage'));
        <Route
          path="/admin/data-monitoring"
          element={<ProtectedRoute component={DataMonitoringPage} requiredRole="admin" />}
        />

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
        <Route
          path="/admin/sensors"
          element={<ProtectedRoute component={SensorsPage} requiredRole="admin" />}
        />
        <Route
          path="/admin/monitored-farms"
          element={<ProtectedRoute component={MonitoredFarmsPage} requiredRole="admin" />}
        />
        <Route
          path="/admin/feedback"
          element={<ProtectedRoute component={FeedbackPage} requiredRole="admin" />}
        />
        <Route
          path="/admin/reports"
          element={<ProtectedRoute component={ReportsPage} requiredRole="admin" />}
        />

        {/* Root redirect */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
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

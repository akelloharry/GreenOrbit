/**
 * Authentication Context
 * Manages user authentication, roles, and authorization
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Login user
   */
  // Static login for demo: accepts any credentials, sets user based on role
  const login = useCallback(async (email, password, role = 'farmer') => {
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise((res) => setTimeout(res, 500));
      const demoUser = {
        name: role === 'admin' ? 'Admin User' : 'Farmer Joe',
        email,
        role,
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('user', JSON.stringify(demoUser));
      return { user: demoUser, token: 'demo-token' };
    } catch (err) {
      setError('Demo login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }, []);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    (role) => {
      return user?.role === role;
    },
    [user]
  );

  /**
   * Check if user is farmer
   */
  const isFarmer = useCallback(() => {
    return user?.role === 'farmer';
  }, [user]);

  /**
   * Check if user is admin
   */
  const isAdmin = useCallback(() => {
    return user?.role === 'admin';
  }, [user]);

  /**
   * Restore session from localStorage
   */
  React.useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to restore session:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    hasRole,
    isFarmer,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth hook
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

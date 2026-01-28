/**
 * Main Entry Point for React Application
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        success: {
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#EF4444',
            color: '#fff',
          },
        },
      }}
    />
  </React.StrictMode>
);

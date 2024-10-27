import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

// Add error logging for production debugging
if (process.env.NODE_ENV === 'production') {
  console.error = (...args) => {
    console.log('Error:', ...args);
  };
  
  // Catch unhandled errors
  window.onerror = function(message, source, lineno, colno, error) {
    console.log('Global error:', { message, source, lineno, colno, error });
    return false;
  };

  // Catch unhandled promise rejections
  window.onunhandledrejection = function(event) {
    console.log('Unhandled promise rejection:', event.reason);
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

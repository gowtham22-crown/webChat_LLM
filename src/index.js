import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Performance monitoring
import './utils/performance';

// Service worker for PWA capabilities (optional)
// import './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with error boundary and performance monitoring
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance measurement
const sendToAnalytics = (metric) => {
  // In a real application, send to your analytics service
  console.log('Performance metric:', metric);
};

// Web Vitals monitoring
if ('web-vitals' in window) {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  });
}

// Service Worker registration for offline support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
} 
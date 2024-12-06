import React from 'react';

import ReactDOM from 'react-dom/client';  // React 18+ use 'react-dom/client'
import './index.css';  // Import your global styles (including Tailwind)
import App from './App';  // Main App component

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);  // Use ReactDOM.createRoot for React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HealthSync from './HealthSync';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HealthSync />
  </React.StrictMode>
);

reportWebVitals();

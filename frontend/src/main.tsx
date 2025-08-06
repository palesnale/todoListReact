import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Adjust the path if App is elsewhere
import './style.css'; // Optional: for global styles

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
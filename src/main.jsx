import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals'; // Attach all engines/constants to window before App renders
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

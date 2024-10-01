import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationProvider } from './contexts/NotficationContext';
import { MessengerProvider } from './contexts/MessengerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MessengerProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </MessengerProvider>
  </React.StrictMode>
);

reportWebVitals();
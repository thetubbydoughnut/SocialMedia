import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this line
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationProvider } from './contexts/NotficationContext';
import { MessengerProvider } from './contexts/MessengerContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { history } from './utils/history';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router history={history}>
      <MessengerProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </MessengerProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
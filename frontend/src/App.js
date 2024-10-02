import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { NotificationProvider } from './contexts/NotificationContext';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './Routes';

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <div className="App">
          <Navbar />
          <AppRoutes />
        </div>
      </NotificationProvider>
    </Provider>
  );
}

export default App;
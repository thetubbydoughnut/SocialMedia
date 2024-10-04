import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NewsFeed from './components/NewsFeed/NewsFeed';
import UserProfile from './components/UserProfile/UserProfile';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <NotificationProvider>
      <div className="App">
        <Navbar toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/user/:username" element={<UserProfile />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </NotificationProvider>
  );
}

export default App;
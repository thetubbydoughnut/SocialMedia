import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NewsFeed from './components/NewsFeed/NewsFeed';
import UserProfile from './components/UserProfile/UserProfile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Search from './components/Search/Search';
import Marketplace from './components/Marketplace/Marketplace';
import Friends from './components/Friends/Friends';
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
    </NotificationProvider>
  );
}

export default App;
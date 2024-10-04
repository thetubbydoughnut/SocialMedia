import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './redux/authSlice';
import Navbar from './components/Navbar/Navbar';
import NewsFeed from './components/NewsFeed/NewsFeed';
import UserProfile from './components/UserProfile/UserProfile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Search from './components/Search/Search';
import Marketplace from './components/Marketplace/Marketplace';
import Friends from './components/Friends/Friends';
import { NotificationProvider } from './contexts/NotificationContext';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <NotificationProvider>
      <div className="App">
        <Navbar toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <NewsFeed />
            </ProtectedRoute>
          } />
          <Route path="/user/:username" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } />
          <Route path="/marketplace" element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } />
          <Route path="/friends" element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </NotificationProvider>
  );
}

export default App;
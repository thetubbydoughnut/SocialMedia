import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/profile/:username" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { login, getProfile } from './redux/slices/authSlice';
import Header from './components/layout/Header';
import Login from './components/features/auth/login/Login';
import Register from './components/features/auth/register/Register';
import Profile from './components/features/auth/profile/Profile';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/features/auth/forgotPassword/ForgotPassword';
import ResetPassword from './components/features/auth/resetPassword/ResetPassword';
import EmailVerification from './components/features/auth/emailVerification/EmailVerification';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      dispatch(login({ token }));
      window.history.replaceState({}, document.title, "/");
    }
  }, [dispatch, location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, user]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
      </Routes>
    </div>
  );
};

export default App;
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { login } from './redux/slices/authSlice';
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      dispatch(login({ token }));
      // Remove the token from the URL
      window.history.replaceState({}, document.title, "/");
    }
  }, [dispatch, location]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
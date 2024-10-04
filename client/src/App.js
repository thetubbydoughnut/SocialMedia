import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user && location.pathname !== '/register') {
    // Redirect to login for all routes except register when not authenticated
    return <Navigate to="/login" replace />;
  }

  // If there is a user, or it's the register route, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
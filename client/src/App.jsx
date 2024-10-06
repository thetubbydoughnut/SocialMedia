import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import ProfilePage from './pages/profile/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import ErrorBoundary from './components/ErrorBoundary';
import { getProfile } from './redux/slices/authSlice';
import PrivateRoute from './components/PrivateRoute';
// ... other imports

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* ... other routes */}
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
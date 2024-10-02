import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './redux/postsSlice';
import Marketplace from './components/Marketplace/Marketplace';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './Routes';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <NotificationProvider>
      <div className="App">
        <Navbar />
        <AppRoutes />
        <Marketplace />
      </div>
    </NotificationProvider>
  );
}

export default App;
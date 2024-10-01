import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import Home from './components/Home/Home';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Marketplace from './components/Marketplace/Marketplace';
import Watch from './components/Watch/Watch';
import Profile from './components/Profile/Profile';
import Header from './components/Navbar/Navbar';
import { ThemeProvider } from './ThemeContext';
import './App.css';
import Messenger from './components/Messenger/Messenger';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import Register from './components/Register/Register';
import SearchResults from './components/SearchResults/SearchResults';
import { fetchProfile as fetchCurrentUserProfile } from './slices/profileSlice';
import { loadAuthToken } from './utils/authUtils';
import { setupInterceptors } from './utils/axiosInstance';
import { authSelectors } from './slices/authSlice';
import { connectSocket, disconnectSocket } from './utils/socketManager';
import ChatList from './components/Chat/ChatList';
import ChatWindow from './components/Chat/ChatWindow';
import StoriesList from './components/Stories/StoriesList';
import UploadStory from './components/Stories/UploadStory';

const AppContent = () => {
    const dispatch = useDispatch();
    const user = useSelector(authSelectors.selectUser);

    useEffect(() => {
        const tokenLoaded = loadAuthToken();
        if (tokenLoaded) {
            dispatch(fetchCurrentUserProfile());
        }
    }, [dispatch]);

    useEffect(() => {
        setupInterceptors();
    }, []);

    useEffect(() => {
        if (user && user.username) {
            dispatch(fetchCurrentUserProfile(user.username));
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (user) {
            connectSocket(user);
        }

        return () => {
            if (user) {
                disconnectSocket();
            }
        };
    }, [user]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                {/* Protected Routes */}
                <Route 
                    path="/" 
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/newsfeed" 
                    element={
                        <PrivateRoute>
                            <NewsFeed />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/marketplace" 
                    element={
                        <PrivateRoute>
                            <Marketplace />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/watch" 
                    element={
                        <PrivateRoute>
                            <Watch />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/profile/:username" 
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/search" 
                    element={
                        <PrivateRoute>
                            <SearchResults />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/messenger" 
                    element={
                        <PrivateRoute>
                            <Messenger />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </>
    );
};

const App = () => (
    <Provider store={store}>
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    </Provider>
);

export default App;
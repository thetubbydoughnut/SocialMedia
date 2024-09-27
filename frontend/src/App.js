import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
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

const AppContent = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<PrivateRoute element={<Home />} />} />
                <Route path="/newsfeed" element={<PrivateRoute element={<NewsFeed />} />} />
                <Route path="/marketplace" element={<PrivateRoute element={<Marketplace />} />} />
                <Route path="/watch" element={<PrivateRoute element={<Watch />} />} />
                <Route path="/profile/:id/*" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/messenger" element={<PrivateRoute element={<Messenger />} />} />
                <Route path="/messenger/:id" element={<PrivateRoute element={<Messenger />} />} />
            </Routes>
        </Router>
    );
};

const App = () => (
    <Provider store={store}>
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    </Provider>
);

export default App;
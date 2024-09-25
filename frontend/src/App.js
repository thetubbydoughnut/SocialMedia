import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { UserProvider } from './UserContext';
import Home from './components/Home/Home';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Marketplace from './components/Marketplace/Marketplace';
import Watch from './components/Watch/Watch';
import Profile from './components/Profile/Profile';
import Header from './components/Navbar/Navbar';
import { useTheme } from './ThemeContext';
import './App.css';
import Messenger from './components/Messenger/Messenger';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import Register from './components/Register/Register';

function App() {
    const { theme } = useTheme();

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <Provider store={store}>
            <UserProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/newsfeed" element={<PrivateRoute><NewsFeed /></PrivateRoute>} />
                        <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
                        <Route path="/watch" element={<PrivateRoute><Watch /></PrivateRoute>} />
                        <Route path="/profile/:id/*" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/messenger" element={<PrivateRoute><Messenger /></PrivateRoute>} />
                        <Route path="/messenger/:id" element={<PrivateRoute><Messenger /></PrivateRoute>} />
                    </Routes>
                </Router>
            </UserProvider>
        </Provider>
    );
}

export default App;
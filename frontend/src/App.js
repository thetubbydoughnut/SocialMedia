import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Marketplace from './components/Marketplace/Marketplace';
import Watch from './components/Watch/Watch';
import Profile from './components/Profile/Profile';
import Header from './components/Navbar/Navbar';
import { useTheme } from './ThemeContext';
import './App.css';
import Messenger from './components/Messenger/Messenger';

function App() {
    const { theme } = useTheme();

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newsfeed" element={<NewsFeed />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/watch" element={<Watch />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/messenger" element={<Messenger />} />
            </Routes>
        </Router>
    );
}

export default App;
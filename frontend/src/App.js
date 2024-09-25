import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Marketplace from './components/Marketplace/Marketplace';
import Watch from './components/Watch/Watch';
import Profile from './components/Profile/Profile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newsfeed" element={<NewsFeed />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/watch" element={<Watch />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Marketplace from './components/Marketplace/Marketplace';
import Watch from './components/Watch/Watch';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newsfeed" element={<NewsFeed />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/watch" element={<Watch />} />
            </Routes>
        </Router>
    );
}

export default App;
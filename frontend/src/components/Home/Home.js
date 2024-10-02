import React from 'react';
import NewsFeed from '../NewsFeed/NewsFeed';
import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <NewsFeed />
            <Widgets />
        </div>
    );
};

export default Home;
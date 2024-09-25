import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NewsFeed from '../NewsFeed/NewsFeed';
import Widgets from '../Widgets/Widgets';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home__body">
                <Sidebar />
                <NewsFeed />
                <Widgets />
            </div>
        </div>
    );
};

export default Home;
import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import NewsFeed from '../NewsFeed/NewsFeed';
import Widgets from '../Widgets/Widgets';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <Header />
            <div className="home__body">
                <Sidebar />
                <NewsFeed />
                <Widgets />
            </div>
        </div>
    );
};

export default Home;
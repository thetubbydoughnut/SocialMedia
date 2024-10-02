import React from 'react';
import NewsFeed from '../NewsFeed/NewsFeed';
import Widgets from '../Widgets/Widgets';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home__background"></div>
            <div className="home__content">
                <NewsFeed />
                <Widgets />
            </div>
        </div>
    );
};

export default Home;
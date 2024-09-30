import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NewsFeed from '../NewsFeed/NewsFeed';
import Widgets from '../Widgets/Widgets';
import QuickPost from '../QuickPost/QuickPost';
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="home">
            <Sidebar />
            <div className="home__content">
                <Widgets />
                <QuickPost onPostCreated={handlePostCreated} />
                <NewsFeed posts={posts} />
            </div>
        </div>
    );
};

export default Home;
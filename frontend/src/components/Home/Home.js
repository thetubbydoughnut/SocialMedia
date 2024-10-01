import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NewsFeed from '../NewsFeed/NewsFeed';
import Widgets from '../Widgets/Widgets';
import QuickPost from '../QuickPost/QuickPost';
import './Home.css';
import NotificationsList from '../Notifications/NotificationsList';
import ChatList from '../Chat/ChatList';
import ChatWindow from '../Chat/ChatWindow';
import StoriesList from '../Stories/StoriesList';
import UploadStory from '../Stories/UploadStory';

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
                <UploadStory />
                <StoriesList />
                <NotificationsList />
                <ChatWindow />
                <ChatList />
            </div>
        </div>
    );
};

export default Home;
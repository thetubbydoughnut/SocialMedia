import React from 'react';
import CreatePost from './features/posts/CreatePost';
import NewsFeed from './features/posts/NewsFeed';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <CreatePost />
      <NewsFeed />
    </div>
  );
};

export default Home;
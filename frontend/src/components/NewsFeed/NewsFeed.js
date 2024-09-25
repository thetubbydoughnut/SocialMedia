import React from 'react';
import './NewsFeed.css';
import samplePosts from '../../data/samplePosts';
import Post from '../Post/Post';

const NewsFeed = () => {
    return (
        <div className="newsfeed">
            <h1>News Feed</h1>
            {samplePosts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default NewsFeed;
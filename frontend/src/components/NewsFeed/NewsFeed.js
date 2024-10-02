import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import './NewsFeed.css';

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!isAuthenticated) return;
            
            try {
                const response = await axiosInstance.get('/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error.response || error);
                setError('Failed to fetch posts. Please try again later.');
            }
        };

        fetchPosts();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <div>Please log in to view posts.</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="newsfeed">
            <h2>News Feed</h2>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default NewsFeed;
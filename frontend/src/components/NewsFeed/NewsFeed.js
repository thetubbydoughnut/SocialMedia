import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import './NewsFeed.css';
import Post from '../Post/Post';

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get('/posts');
                setPosts(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="newsfeed">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default NewsFeed;
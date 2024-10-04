import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import './NewsFeed.css';

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error.response?.data || error.message);
            setError('Failed to fetch posts. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;
        try {
            const response = await axios.post('/posts', { content: newPost, username: 'CurrentUser' });
            setPosts([response.data, ...posts]);
            setNewPost('');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating post:', error.response?.data || error.message);
            setError('Failed to create post. Please try again.');
        }
    };

    return (
        <div className="instagram-feed">
            <div className="create-post-button" onClick={() => setIsModalOpen(true)}>
                <img src="/default-avatar.png" alt="User Avatar" className="avatar" />
                <span>Create a new post</span>
            </div>

            {isModalOpen && (
                <div className="create-post-overlay">
                    <div className="create-post-modal">
                        <h2>Create a post</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Write a caption..."
                                rows="3"
                            />
                            <div className="create-post-actions">
                                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit">Share</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="posts">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="instagram-post">
                            <div className="post-header">
                                <img src="/default-avatar.png" alt="User Avatar" className="avatar" />
                                <Link to={`/user/${post.username}`} className="username">{post.username}</Link>
                            </div>
                            <div className="post-image">
                                {/* Placeholder for post image */}
                                <div className="image-placeholder"></div>
                            </div>
                            <div className="post-actions">
                                <button className="action-button">❤️</button>
                                <button className="action-button">💬</button>
                                <button className="action-button">🚀</button>
                            </div>
                            <div className="post-content">
                                <p><strong>{post.username}</strong> {post.content}</p>
                            </div>
                            <div className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</div>
                        </div>
                    ))
                ) : (
                    <div className="no-posts-message">
                        <p>No posts yet</p>
                        <p>Be the first to post something!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsFeed;
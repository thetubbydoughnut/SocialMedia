import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import './NewsFeed.css';

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({ content: '', imageUrl: '', file: null });
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        fetchPosts();
    }, [isAuthenticated]);

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

    const handleInputChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setNewPost({ ...newPost, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', newPost.content);
        if (newPost.file) {
            formData.append('image', newPost.file);
        } else if (newPost.imageUrl) {
            formData.append('imageUrl', newPost.imageUrl);
        }

        try {
            const response = await axiosInstance.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setNewPost({ content: '', imageUrl: '', file: null });
            setPosts([response.data, ...posts]);
            setError(null);
        } catch (error) {
            console.error('Error creating post:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Failed to create post. Please try again.');
            }
        }
    };

    if (!isAuthenticated) {
        return <div>Please log in to view posts.</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="newsfeed">
            <h2>News Feed</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    placeholder="What's on your mind?"
                    required
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={newPost.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL (optional)"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <button type="submit">Post</button>
            </form>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="post">
                        <h3>{post.username}</h3>
                        <p>{post.content}</p>
                        {post.image_url && <img src={post.image_url} alt="Post" />}
                    </div>
                ))
            )}
        </div>
    );
};

export default NewsFeed;
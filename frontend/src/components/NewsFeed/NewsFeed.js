import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import './NewsFeed.css';

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({ content: '', imageUrl: '', file: null });
    const [preview, setPreview] = useState(null);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

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
            setPosts([]); // Set posts to an empty array if fetch fails
        }
    };

    const handleInputChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewPost({ ...newPost, file: file });
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
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
            setPosts([response.data, ...posts]);
            setNewPost({ content: '', imageUrl: '', file: null });
            setPreview(null);
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
            <div className="post-creation">
                <h2>Create a New Post</h2>
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
                {preview && (
                    <div className="post-preview">
                        <h3>Preview</h3>
                        <div className="post">
                            <div className="post-header">
                                <img src={user.profilePhoto || 'default-avatar.png'} alt={user.username} className="avatar" />
                                <span className="username">{user.username}</span>
                            </div>
                            <img src={preview} alt="Preview" className="post-image" />
                            <div className="post-content">
                                <p><strong>{user.username}</strong> {newPost.content}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <h2>News Feed</h2>
            {posts.length === 0 ? (
                <div className="no-posts-message">
                    <p>There are no posts yet. Be the first to share something with your friends!</p>
                    <p>Create a post above to get started.</p>
                </div>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-header">
                            <img src={post.userProfilePhoto || 'default-avatar.png'} alt={post.username} className="avatar" />
                            <span className="username">{post.username}</span>
                        </div>
                        {post.image_url && <img src={post.image_url} alt="Post" className="post-image" />}
                        <div className="post-content">
                            <p><strong>{post.username}</strong> {post.content}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NewsFeed;
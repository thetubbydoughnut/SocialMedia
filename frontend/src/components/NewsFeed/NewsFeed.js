import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import './NewsFeed.css';

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({ content: '', imageUrl: '', file: null });
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
        }
    }, [isAuthenticated]);

    const fetchPosts = async () => {
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
            setIsCreatePostOpen(false);
        } catch (error) {
            console.error('Error creating post:', error.response ? error.response.data : error);
            setError('Failed to create post. Please try again.');
        }
    };

    if (!isAuthenticated) {
        return <div>Please log in to view posts.</div>;
    }

    return (
        <div className="newsfeed">
            <div className="create-post-button" onClick={() => setIsCreatePostOpen(true)}>
                <img src={user.profilePhoto || '/path/to/default-avatar.png'} alt={user.username} className="avatar" />
                <span>What's on your mind, {user.username}?</span>
            </div>

            {isCreatePostOpen && (
                <div className="create-post-overlay">
                    <div className="create-post-modal">
                        <h2>Create Post</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                name="content"
                                value={newPost.content}
                                onChange={handleInputChange}
                                placeholder={`What's on your mind, ${user.username}?`}
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
                            {preview && (
                                <div className="image-preview">
                                    <img src={preview} alt="Preview" />
                                </div>
                            )}
                            <div className="create-post-actions">
                                <button type="button" onClick={() => setIsCreatePostOpen(false)}>Cancel</button>
                                <button type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <h2>News Feed</h2>
            {error && <div className="error-message">{error}</div>}
            {posts.length === 0 ? (
                <div className="no-posts-message">
                    <p>There are no posts yet. Be the first to share something with your friends!</p>
                    <p>Create a post above to get started.</p>
                </div>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-header">
                            <img src={post.userProfilePhoto || '/path/to/default-avatar.png'} alt={post.username} className="avatar" />
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
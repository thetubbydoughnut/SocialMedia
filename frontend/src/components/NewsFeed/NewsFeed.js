import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, createPost, likePost } from '../../redux/postsSlice';
import CreatePostModal from '../CreatePostModal/CreatePostModal';
import './NewsFeed.css';

const NewsFeed = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.items);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleCreatePost = (postData) => {
        dispatch(createPost(postData));
        setIsModalOpen(false);
    };

    const handleLikePost = (postId) => {
        dispatch(likePost(postId));
    };

    return (
        <div className="instagram-feed">
            <div className="create-post-button" onClick={() => setIsModalOpen(true)}>
                <img src="/default-avatar.png" alt="User Avatar" className="avatar" />
                <span>Create a post</span>
            </div>
            {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} onSubmit={handleCreatePost} />}
            {posts.map(post => (
                <div key={post.id} className="instagram-post">
                    <div className="post-header">
                        <img src={post.authorAvatar || "/default-avatar.png"} alt={post.author} className="avatar" />
                        <span className="username">{post.author}</span>
                    </div>
                    <div className="post-image">
                        <img src={post.image || "/default-post-image.jpg"} alt="Post content" />
                    </div>
                    <div className="post-actions">
                        <button onClick={() => handleLikePost(post.id)} className="action-button">❤️</button>
                        <button className="action-button">💬</button>
                        <button className="action-button">🚀</button>
                    </div>
                    <div className="post-likes">{post.likes} likes</div>
                    <div className="post-content">
                        <span className="username">{post.author}</span> {post.content}
                    </div>
                    <div className="post-timestamp">{new Date(post.timestamp).toLocaleString()}</div>
                </div>
            ))}
        </div>
    );
};

export default NewsFeed;
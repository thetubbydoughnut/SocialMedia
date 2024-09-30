import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const QuickPost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentUser = useSelector(state => state.auth?.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim()) {
            setIsLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append('content', content);
            if (image) {
                formData.append('image', image);
            }

            try {
                const response = await axios.post('/api/posts', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                onPostCreated(response.data);
                setContent('');
                setImage(null);
            } catch (err) {
                setError('Failed to create post. Please try again.');
                console.error('Error creating post:', err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    return (
        <div className="quick-post">
            <div className="quick-post__input">
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={currentUser ? `What's on your mind, ${currentUser.username}?` : "What's on your mind?"}
                    disabled={isLoading}
                />
            </div>
            <div className="quick-post__actions">
                <label htmlFor="image-upload" className="quick-post__action-button">
                    <FontAwesomeIcon icon={faImage} />
                    <span>Photo/Video</span>
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    disabled={isLoading}
                />
                <button onClick={handleSubmit} disabled={isLoading || !content.trim()} className="quick-post__submit-button">
                    {isLoading ? 'Posting...' : 'Post'}
                </button>
            </div>
            {(content || image) && (
                <div className="quick-post__preview">
                    <h3>Post Preview</h3>
                    <div className="post">
                        <div className="post__header">
                            <img src={currentUser?.profilePhoto || '/default-profile.png'} alt={currentUser?.username || 'User'} className="post__profile-picture" />
                            <div className="post__user-info">
                                <h3>{currentUser?.username || 'User'}</h3>
                            </div>
                            <div className="post__content">
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default QuickPost;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const QuickPost = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            const newPost = {
                user: {
                    name: 'Current User',
                    profilePicture: '/path/to/default/profile/picture.jpg',
                    username: 'currentuser'
                },
                content: content,
                image: image,
                reactions: {},
                comments: []
            };
            onPostCreated(newPost);
            setContent('');
            setImage(null);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="post quick-post">
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                />
                <div className="quick-post__actions">
                    <label htmlFor="image-upload" className="image-upload-label">
                        <FontAwesomeIcon icon={faImage} />
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </label>
                    <button type="submit">Post</button>
                </div>
                {image && (
                    <div className="image-preview">
                        <img src={image} alt="Preview" />
                    </div>
                )}
            </form>
        </div>
    );
};

export default QuickPost;
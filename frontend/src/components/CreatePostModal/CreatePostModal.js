import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/postsSlice';
import './CreatePostModal.css';

const CreatePostModal = ({ onClose }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (media) {
      formData.append('media', media);
    }
    dispatch(createPost(formData));
    onClose();
  };

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };

  return (
    <div className="create-post-overlay">
      <div className="create-post-modal">
        <h2>Create a post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows="3"
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
          <div className="create-post-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
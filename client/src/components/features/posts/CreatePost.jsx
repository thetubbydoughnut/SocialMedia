import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../../redux/slices/postsSlice';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(createPost({ content }));
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows="3"
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
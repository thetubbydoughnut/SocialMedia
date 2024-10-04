import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPost } from '../../../redux/slices/postsSlice';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (media) {
      formData.append('media', media);
    }

    try {
      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(addPost(response.data));
      setTitle('');
      setContent('');
      setMedia(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="file"
        onChange={(e) => setMedia(e.target.files[0])}
        accept="image/*,video/*"
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
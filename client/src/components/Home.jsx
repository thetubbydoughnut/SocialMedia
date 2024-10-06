import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment } from '../redux/slices/commentsSlice';
import io from 'socket.io-client';
import { fetchPosts } from '../redux/slices/postsSlice';

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket'],
  upgrade: false
});

const Home = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.items);
  const posts = useSelector((state) => state.posts.posts); // Get posts from Redux store
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchComments());

    socket.on('new-comment', (comment) => {
      dispatch(addComment(comment));
    });

    return () => {
      socket.off('new-comment');
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('Dispatching fetchPosts');
        await dispatch(fetchPosts());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };
    loadPosts();
  }, [dispatch]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        if (post.id) {
          dispatch(fetchComments(post.id));
        } else {
          console.warn('Post ID is undefined for:', post);
        }
      });
    }
  }, [posts, dispatch]);

  const handleUpdatePost = (updatedPost) => {
    // This function should dispatch an action to update the post in the Redux store
    // For example: dispatch(updatePost(updatedPost));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const commentData = { text: newComment };
      await axios.post(`${process.env.REACT_APP_API_URL}/comments`, commentData, config);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment: ', error);
      setError('Failed to add comment. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div>
      <h1>Home Feed</h1>
      {posts && posts.length > 0 ? (
        posts.map(post => (
          <PostItem 
            key={post.id} 
            post={post} 
            onUpdatePost={handleUpdatePost}
          />
        ))
      ) : (
        <p>No posts available.</p>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
      <div>
        {comments && comments.map((comment) => (
          <div key={comment.id}>
            <p><strong>{comment.name}</strong>: {comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
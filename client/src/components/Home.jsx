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
  const comments = useSelector((state) => state.comments.items); // Ensure this matches your store setup
  const [newComment, setNewComment] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchComments());

    // Listen for 'new-comment' events
    socket.on('new-comment', (comment) => {
      dispatch(addComment(comment));
    });

    return () => {
      socket.off('new-comment');
      socket.disconnect();
    };
  }, [dispatch]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      // {{ edit_1 }} Use environment variable for API URL
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, config);
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        await dispatch(fetchPosts());
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    loadPosts();
  }, [dispatch]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      posts.forEach(post => {
        if (post.id) { // Ensure post.id exists
          dispatch(fetchComments(post.id)); // Fetch comments for each post
        } else {
          console.warn('Post ID is undefined for:', post);
        }
      });
    }
  }, [posts, dispatch]);

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // {{ edit_2 }} Ensure token is retrieved
      if (!token) {
        throw new Error('No token found');
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      // {{ edit_3 }} Use environment variable for API URL
      const commentData = { text: newComment };
      await axios.post(`${process.env.REACT_APP_API_URL}/comments`, commentData, config);
      setNewComment('');
      // No need to manually fetch comments if using Socket.io
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
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
          onUpdatePost={handleUpdatePost}
        />
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p><strong>{comment.name}</strong>: {comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
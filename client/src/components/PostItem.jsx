import React, { useState } from 'react';
import axios from 'axios';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/slices/commentsSlice';

const PostItem = ({ post, onUpdatePost }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleLike = async () => {
    // ... (keep the existing like functionality)
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
      
      const commentData = { postId: post.id, content: newComment };
      await dispatch(addComment(commentData));
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment: ', error);
      setError('Failed to add comment. Please try again.');
    }
  };

  return (
    <div className="post-item">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
      <p>Posted by: {post.username}</p>
      <LikeButton 
        isLiked={isLiked} 
        likeCount={likeCount} 
        onLike={handleLike} 
      />
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostItem;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/commentsSlice';

const PostItem = ({ post, onUpdatePost }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments[post.id] || []);

  useEffect(() => {
    if (post.id) {
      dispatch(fetchComments(post.id));
    } else {
      console.warn('Missing post ID:', post);
    }
  }, [post.id, dispatch]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const response = await axios.post(`http://localhost:5000/api/posts/${post.id}/like`, {}, config);
      setIsLiked(response.data.liked);
      setLikeCount(prevCount => response.data.liked ? prevCount + 1 : prevCount - 1);
      onUpdatePost({ ...post, isLiked: response.data.liked, likes: response.data.liked ? likeCount + 1 : likeCount - 1 });
    } catch (error) {
      console.error('Error liking/unliking post:', error);
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
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostItem;
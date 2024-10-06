import React, { useState } from 'react';
import axios from 'axios';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/slices/commentsSlice';
import { AppDispatch } from '../store';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  username: string;
  likes: number;
  isLiked: boolean;
}

interface PostItemProps {
  post: Post;
  onUpdatePost: (post: Post) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onUpdatePost }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleLike = async () => {
    // ... (keep the existing like functionality)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
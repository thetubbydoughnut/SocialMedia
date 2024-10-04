import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, commentOnPost, deletePost } from '../../redux/postsSlice';
import './Post.css';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePost(post.id));
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(commentOnPost({ postId: post.id, content: comment }));
    setComment('');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.author.avatar} alt={post.author.username} className="avatar" />
        <span className="username">{post.author.username}</span>
      </div>
      {post.type === 'image' && <img src={post.content} alt="Post content" className="post-image" />}
      {post.type === 'video' && (
        <video controls className="post-video">
          <source src={post.content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="post-actions">
        <button onClick={handleLike}>❤️ {post.likes.length}</button>
        <button>💬 {post.comments.length}</button>
        <button>🚀 Share</button>
        {post.author.username === currentUser.username && (
          <button onClick={handleDelete}>🗑️ Delete</button>
        )}
      </div>
      <div className="post-content">
        <p><strong>{post.author.username}</strong> {post.caption}</p>
      </div>
      <div className="post-comments">
        {post.comments.map(comment => (
          <p key={comment.id}><strong>{comment.author.username}</strong> {comment.content}</p>
        ))}
      </div>
      <form onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Post;
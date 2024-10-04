import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../redux/slices/postsSlice';

const PostItem = ({ post }) => {
  console.log('PostItem render, post:', post);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <div className="post-item">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%' }} />}
      {currentUser && currentUser.id === post.userId && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default PostItem;
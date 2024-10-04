import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../../redux/slices/postsSlice';

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.mediaUrl && (
        <div>
          {post.mediaUrl.endsWith('.mp4') ? (
            <video src={post.mediaUrl} controls />
          ) : (
            <img src={post.mediaUrl} alt="Post media" />
          )}
        </div>
      )}
      {currentUser && currentUser.id === post.userId && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default PostItem;
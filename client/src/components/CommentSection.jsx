import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/commentsSlice';

const CommentSection = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments[postId] || []);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id}>
          <p><strong>{comment.author}</strong>: {comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment } from '../redux/slices/commentsSlice';

const CommentSection = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.items);
  const [newCommentContent, setNewCommentContent] = useState('');

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ postId, content: newCommentContent }));
    setNewCommentContent('');
  };

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
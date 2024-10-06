import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/commentsSlice';
import { makeSelectCommentsByPostId } from '../redux/selectors/commentsSelectors';
import { AppDispatch, RootState } from '../store';

interface CommentSectionProps {
  postId: number;
}

interface Comment {
  id: number;
  author: string;
  content: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectCommentsByPostId = useMemo(makeSelectCommentsByPostId, []);
  const comments = useSelector((state: RootState) => selectCommentsByPostId(state, postId));

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment: Comment) => (
        <div key={comment.id}>
          <p><strong>{comment.author}</strong>: {comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
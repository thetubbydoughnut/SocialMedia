import React from 'react';

const LikeButton = ({ likes, onLike }) => {
  return (
    <button onClick={onLike}>
      👍 {likes} {likes === 1 ? 'Like' : 'Likes'}
    </button>
  );
};

export default LikeButton;
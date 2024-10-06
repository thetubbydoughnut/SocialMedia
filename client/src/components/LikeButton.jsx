import React from 'react';

const LikeButton = ({ isLiked, likeCount, onLike }) => {
  return (
    <button 
      onClick={onLike} 
      className={`like-button ${isLiked ? 'liked' : ''}`}
    >
      {isLiked ? '❤️' : '🤍'} {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
    </button>
  );
};

export default LikeButton;
import React from 'react';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, likeCount, onLike }) => {
  return (
    <button onClick={onLike}>
      {isLiked ? 'Unlike' : 'Like'} ({likeCount})
    </button>
  );
};

export default LikeButton;
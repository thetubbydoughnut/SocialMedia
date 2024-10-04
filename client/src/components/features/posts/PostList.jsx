import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
  console.log('PostList render, posts:', posts);
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
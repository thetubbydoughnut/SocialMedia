import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/slices/postsSlice';
import PostList from './PostList';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    console.log('NewsFeed useEffect, status:', status);
    if (status === 'idle') {
      console.log('Dispatching fetchPosts');
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  console.log('NewsFeed render, posts:', posts, 'status:', status, 'error:', error);

  if (status === 'loading') {
    return <div>Loading posts...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>News Feed</h2>
      {posts && posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default NewsFeed;
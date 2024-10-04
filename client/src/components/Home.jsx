import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/postsSlice';
import CreatePost from './features/posts/CreatePost';
import PostList from './features/posts/PostList';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <CreatePost />
      {status === 'loading' && <div>Loading posts...</div>}
      {error && <div>Error: {error}</div>}
      {status === 'succeeded' && <PostList posts={posts} />}
    </div>
  );
};

export default Home;
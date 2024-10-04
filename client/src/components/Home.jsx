import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/slices/postsSlice';
import CreatePost from './features/posts/CreatePost';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user && <p>Hello, {user.username}!</p>}
      <CreatePost />
      <h2>Recent Posts</h2>
      {posts.length === 0 ? (
        <div>
          <p>There are no posts yet. Why not create the first one?</p>
          <p>Share your thoughts, ideas, or experiences with the community!</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.user.username}</h3>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
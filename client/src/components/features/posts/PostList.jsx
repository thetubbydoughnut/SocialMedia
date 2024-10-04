import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../../redux/slices/postsSlice';
import PostItem from './PostItem';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
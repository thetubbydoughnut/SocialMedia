import React from 'react';
import { useSelector } from 'react-redux';
import './Marketplace.css';

function Marketplace() {
  const posts = useSelector((state) => state.posts.items);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  if (postStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (postStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="marketplace">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>By User ID: {post.user_id}</small>
        </div>
      ))}
    </div>
  );
}

export default Marketplace;
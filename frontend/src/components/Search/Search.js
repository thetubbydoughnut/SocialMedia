import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, searchPosts } from '../../redux/searchSlice';
import { Link } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { users, posts, loading } = useSelector(state => state.search);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchUsers(query));
    dispatch(searchPosts(query));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users or posts..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      <div className="search-results">
        <div className="user-results">
          <h3>Users</h3>
          {users.map(user => (
            <Link key={user.id} to={`/user/${user.username}`} className="user-result">
              <img src={user.avatar} alt={user.username} className="avatar" />
              <span>{user.username}</span>
            </Link>
          ))}
        </div>
        <div className="post-results">
          <h3>Posts</h3>
          {posts.map(post => (
            <Link key={post.id} to={`/post/${post.id}`} className="post-result">
              <p>{post.content.substring(0, 50)}...</p>
              <span>by {post.author.username}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
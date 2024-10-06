import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        
        // Include the token in the request headers
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        const response = await axios.get('http://localhost:9000/api/posts', config);
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Home Feed</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.username && <p>Posted by: {post.username}</p>}
        </div>
      ))}
    </div>
  );
};

export default Home;
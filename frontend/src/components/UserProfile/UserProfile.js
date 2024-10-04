import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axiosConfig';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error.response?.data || error.message);
        setError('Failed to fetch user profile. Please try again later.');
      }
    };

    fetchUser();
  }, [username]);

  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src="/default-avatar.png" alt={`${user.username}'s avatar`} className="profile-avatar" />
        <h1>{user.username}</h1>
      </div>
      <p className="bio">{user.bio}</p>
      <div className="post-count">Posts: {user.posts.length}</div>
      {/* You can add more user information here */}
    </div>
  );
};

export default UserProfile;
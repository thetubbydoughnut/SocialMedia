import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      {/* Add more profile information as needed */}
    </div>
  );
};

export default ProfilePage;
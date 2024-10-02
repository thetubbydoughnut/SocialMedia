import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  return <div>Profile Page for {username}</div>;
};

export default Profile;
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      {/* Profile details */}
    </div>
  );
}

export default ProfilePage;
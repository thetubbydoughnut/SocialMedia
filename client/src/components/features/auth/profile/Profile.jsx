import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, changePassword } from '../../../../redux/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    dispatch(changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleProfileSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={profileData.firstName}
            onChange={handleProfileChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={profileData.lastName}
            onChange={handleProfileChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleProfileChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      <h3>Change Password</h3>
      <form onSubmit={handlePasswordSubmit}>
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
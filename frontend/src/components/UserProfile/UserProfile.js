import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../redux/userSlice';
import './UserProfile.css';

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector(state => state.user) || {};
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [dispatch, username]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    dispatch(updateUserProfile(editedProfile));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  if (!profile) return null;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-banner"></div>
        <div className="profile-info">
          <img src={profile.avatar || "/default-avatar.png"} alt={profile.username} className="profile-avatar" />
          <div className="profile-details">
            <h2>{profile.username}</h2>
            <p className="profile-handle">@{profile.username}</p>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedProfile.bio}
                onChange={handleChange}
                className="profile-bio-edit"
              />
            ) : (
              <p className="profile-bio">{profile.bio}</p>
            )}
          </div>
          {isEditing ? (
            <button onClick={handleSave} className="profile-edit-button">Save</button>
          ) : (
            <button onClick={handleEdit} className="profile-edit-button">Edit Profile</button>
          )}
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-value">{profile.posts?.length || 0}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat">
          <span className="stat-value">{profile.followers?.length || 0}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-value">{profile.following?.length || 0}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
      {/* Add user's posts here */}
    </div>
  );
};

export default UserProfile;
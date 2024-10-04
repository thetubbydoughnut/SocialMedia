import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../redux/userSlice';
import './UserProfile.css';

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
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

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <img src={profile.avatar} alt={profile.username} className="profile-avatar" />
      {isEditing ? (
        <>
          <input
            name="username"
            value={editedProfile.username}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            value={editedProfile.bio}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h2>{profile.username}</h2>
          <p>{profile.bio}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
import React, { useState } from 'react';
import { getImageOrPlaceholder } from '../../utils/imageUtils';
import './Profile.css';
import FriendsList from '../FriendsList/FriendsList';
import Modal from '../Modal/Modal';

const Profile = () => {
    const [showFriends, setShowFriends] = useState(false);

    const toggleFriendsList = () => {
        setShowFriends(!showFriends);
    };

    const coverPhoto = getImageOrPlaceholder('/path/to/cover/photo.jpg', 'https://via.placeholder.com/150');
    const profilePhoto = getImageOrPlaceholder('/path/to/profile/photo.jpg', 'https://via.placeholder.com/150');

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__cover">
                    <img src={coverPhoto} alt="Cover" />
                </div>
                <div className="profile__info">
                    <img src={profilePhoto} alt="Profile" className="profile__photo" />
                    <h1 className="profile__name">User Name</h1>
                    <p className="profile__bio">This is the user's bio</p>
                </div>
            </div>
            <div className="profile__body">
                <div className="profile__sidebar">
                    <div className="profile__sidebarOption">About</div>
                    <div className="profile__sidebarOption" onClick={toggleFriendsList}>Friends</div>
                    <div className="profile__sidebarOption">Photos</div>
                    <div className="profile__sidebarOption">More</div>
                </div>
                <div className="profile__content">
                    <h2>Posts</h2>
                    {/* User's posts */}
                </div>
            </div>
            <button onClick={toggleFriendsList} className="toggle-friends-button">
                {showFriends ? 'Hide Friends' : 'Show Friends'}
            </button>
            {showFriends && (
                <Modal onClose={toggleFriendsList}>
                    <FriendsList />
                </Modal>
            )}
        </div>
    );
};

export default Profile;
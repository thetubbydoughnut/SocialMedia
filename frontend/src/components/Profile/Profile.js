import React from 'react';
import { getImageOrPlaceholder } from '../../utils/imageUtils';
import './Profile.css';

const Profile = () => {
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
                    <div className="profile__sidebarOption">Friends</div>
                    <div className="profile__sidebarOption">Photos</div>
                    <div className="profile__sidebarOption">More</div>
                </div>
                <div className="profile__content">
                    <h2>Posts</h2>
                    {/* User's posts */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
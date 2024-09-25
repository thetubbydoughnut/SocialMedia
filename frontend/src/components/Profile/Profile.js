import React, { useState, useEffect } from 'react';
import { useParams, Route, Routes, Link } from 'react-router-dom';
import { getImageOrPlaceholder } from '../../utils/imageUtils';
import './Profile.css';
import Timeline from '../Timeline/Timeline';
import About from '../About/About';
import FriendsList from '../FriendsList/FriendsList';
import Photos from '../Photos/Photos';
import More from '../More/More';
import sampleFriends from '../../data/sampleFriends'; // Assuming you have a sampleFriends data file

const Profile = () => {
    const { username } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('');
    const [userBio, setUserBio] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');

    useEffect(() => {
        // Fetch user data based on the username
        // This is a placeholder for the actual data fetching logic
        setUserName(username);
        setUserBio('This is the user\'s bio');
        setProfilePhoto(getImageOrPlaceholder('/path/to/profile/photo.jpg', 'https://via.placeholder.com/150'));
        setCoverPhoto(getImageOrPlaceholder('/path/to/cover/photo.jpg', 'https://via.placeholder.com/150'));
    }, [username]);

    const toggleEditProfile = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__cover">
                    <img src={coverPhoto} alt="Cover" />
                </div>
                <div className="profile__info">
                    <img src={profilePhoto} alt="Profile" className="profile__photo" />
                    <div className="profile__details">
                        {isEditing ? (
                            <form onSubmit={handleSaveProfile} className="profile__edit-form">
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="profile__edit-input"
                                />
                                <textarea
                                    value={userBio}
                                    onChange={(e) => setUserBio(e.target.value)}
                                    className="profile__edit-textarea"
                                />
                                <label className="profile__edit-label">Profile Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePhotoChange}
                                    className="profile__edit-file-input"
                                />
                                <label className="profile__edit-label">Cover Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverPhotoChange}
                                    className="profile__edit-file-input"
                                />
                                <button type="submit" className="profile__save-button">Save</button>
                            </form>
                        ) : (
                            <>
                                <h1 className="profile__name">{userName}</h1>
                                <p className="profile__bio">{userBio}</p>
                                <button className="profile__edit-button" onClick={toggleEditProfile}>Edit Profile</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="profile__body">
                <div className="profile__sidebar">
                    <Link to={`/profile/${username}/timeline`} className="profile__sidebarOption">Timeline</Link>
                    <Link to={`/profile/${username}/about`} className="profile__sidebarOption">About</Link>
                    <Link to={`/profile/${username}/friends`} className="profile__sidebarOption">Friends</Link>
                    <Link to={`/profile/${username}/photos`} className="profile__sidebarOption">Photos</Link>
                    <Link to={`/profile/${username}/more`} className="profile__sidebarOption">More</Link>
                </div>
                <div className="profile__content">
                    <Routes>
                        <Route path="timeline" element={<Timeline />} />
                        <Route path="about" element={<About />} />
                        <Route path="friends" element={<FriendsList friends={sampleFriends} />} />
                        <Route path="photos" element={<Photos />} />
                        <Route path="more" element={<More />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Profile;
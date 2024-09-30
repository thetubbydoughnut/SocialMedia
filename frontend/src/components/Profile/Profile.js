import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser as fetchCurrentUser, updateProfilePhoto } from '../../slices/userSlice';
import axiosInstance from '../../utils/axiosInstance';
import { getImageOrPlaceholder } from '../../utils/imageUtils';
import './Profile.css';
import Timeline from '../Timeline/Timeline';
import About from '../About/About';
import FriendsList from '../FriendsList/FriendsList';
import Photos from '../Photos/Photos';
import More from '../More/More';

const Profile = () => {
    const { username } = useParams(); // Extract username from URL parameters
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.user);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);
    const [coverPhotoFile, setCoverPhotoFile] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);

    useEffect(() => {
        console.log('Username from params:', username); // Debug log

        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/profile/${username}`); // Use username from URL parameters
                setUser(response.data);
                setEditedUser(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchProfile();
        } else {
            setError('No username provided');
            setLoading(false);
        }
    }, [username]); // Ensure useEffect runs when username changes

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUser(user);
        setProfilePhotoFile(null);
        setCoverPhotoFile(null);
        setProfilePhotoPreview(null);
        setCoverPhotoPreview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'profile') {
                    setProfilePhotoFile(file);
                    setProfilePhotoPreview(reader.result);
                } else if (type === 'cover') {
                    setCoverPhotoFile(file);
                    setCoverPhotoPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                username: editedUser.username,
                bio: editedUser.bio,
            };

            await axiosInstance.put('/profile/me', updatedData);

            if (profilePhotoFile) {
                const response = await handleProfilePhotoUpload(profilePhotoFile);
                dispatch(updateProfilePhoto(response.data.profilePhoto));
            }

            if (coverPhotoFile) {
                await handleCoverPhotoUpload(coverPhotoFile);
            }

            setUser(editedUser);
            setIsEditing(false);
            dispatch(fetchCurrentUser());
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>User not found</div>;

    const handleProfilePhotoUpload = async (file) => {
        const formData = new FormData();
        formData.append('profilePhoto', file);

        try {
            const response = await axiosInstance.post('/profile/me/profilePhoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUser({ ...user, profilePhoto: response.data.profilePhoto });
        } catch (error) {
            console.error('Error uploading profile photo:', error);
        }
    };

    const handleCoverPhotoUpload = async (file) => {
        const formData = new FormData();
        formData.append('coverPhoto', file);

        try {
            const response = await axiosInstance.post('/profile/me/coverPhoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUser({ ...user, coverPhoto: response.data.coverPhoto });
        } catch (error) {
            console.error('Error uploading cover photo:', error);
        }
    };

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__cover">
                    <img src={coverPhotoPreview || getImageOrPlaceholder(user.coverPhoto, '/default-cover.png')} alt="Cover" />
                    {isEditing && (
                        <label htmlFor="cover-photo-upload" className="profile__cover-edit-button">
                            <i className="fas fa-camera"></i> Edit Cover Photo
                            <input
                                id="cover-photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'cover')}
                                className="profile__cover-upload"
                            />
                        </label>
                    )}
                </div>
            </div>
            <div className="profile__info">
                <div className="profile__info-left">
                    <div className="profile__photo-container">
                        <img 
                            src={profilePhotoPreview || getImageOrPlaceholder(user.profilePhoto, '/default-profile.png')} 
                            alt={`${user.username}'s profile`} 
                            className="profile__photo" 
                        />
                        {isEditing && (
                            <label htmlFor="profile-photo-upload" className="profile__photo-edit-button">
                                Edit Photo
                                <input
                                    id="profile-photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'profile')}
                                    className="profile__photo-upload"
                                />
                            </label>
                        )}
                    </div>
                    <div className="profile__details">
                        <h1 className="profile__name">{user.username}</h1>
                        <p className="profile__bio">{user.bio}</p>
                        {currentUser && currentUser.username === user.username && (
                            isEditing ? (
                                <div className="profile__edit-buttons">
                                    <button onClick={handleSaveProfile} className="profile__save-button">
                                        Save Profile
                                    </button>
                                    <button onClick={handleCancelEdit} className="profile__cancel-button">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleEditClick} className="profile__edit-button">
                                    Edit Profile
                                </button>
                            )
                        )}
                    </div>
                </div>
                <div className="profile__info-nav-links">
                    <NavLink to="" end className={({ isActive }) => isActive ? "active" : ""}>Timeline</NavLink>
                    <NavLink to="about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
                    <NavLink to="friends" className={({ isActive }) => isActive ? "active" : ""}>Friends</NavLink>
                    <NavLink to="photos" className={({ isActive }) => isActive ? "active" : ""}>Photos</NavLink>
                    <NavLink to="more" className={({ isActive }) => isActive ? "active" : ""}>More</NavLink>
                </div>
            </div>
            <div className="profile__body">
                <div className="profile__content">
                    {isEditing ? (
                        <form onSubmit={handleSaveProfile} className="profile__edit-form">
                            <label className="profile__edit-label">
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={editedUser.username}
                                    onChange={handleInputChange}
                                    className="profile__edit-input"
                                />
                            </label>
                            <label className="profile__edit-label">
                                Bio:
                                <textarea
                                    name="bio"
                                    value={editedUser.bio}
                                    onChange={handleInputChange}
                                    className="profile__edit-textarea"
                                />
                            </label>
                        </form>
                    ) : (
                        <Routes>
                            <Route path="" element={<Timeline />} />
                            <Route path="about" element={<About />} />
                            <Route path="friends" element={<FriendsList username={username} />} />
                            <Route path="photos" element={<Photos />} />
                            <Route path="more" element={<More />} />
                        </Routes>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
import React, { useEffect } from 'react';
import { useParams, NavLink, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchProfile, 
    updateProfile, 
    updateProfilePhoto, 
    updateCoverPhoto,
    setIsEditing,
    setEditedUser,
    setProfilePhotoFile,
    setCoverPhotoFile,
    setProfilePhotoPreview,
    setCoverPhotoPreview
} from '../../slices/userSlice';
import axiosInstance from '../../utils/axiosInstance';
import { getImageOrPlaceholder } from '../../utils/imageUtils';
import './Profile.css';
import Timeline from '../Timeline/Timeline';
import About from '../About/About';
import FriendsList from '../FriendsList/FriendsList';
import Photos from '../Photos/Photos';
import More from '../More/More';
import ProfileSearch from '../ProfileSearch/ProfileSearch';

const Profile = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.user);
    const profileUser = useSelector((state) => state.user.profileUser);
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
    const isEditing = useSelector((state) => state.user.isEditing);
    const editedUser = useSelector((state) => state.user.editedUser);
    const profilePhotoFile = useSelector((state) => state.user.profilePhotoFile);
    const coverPhotoFile = useSelector((state) => state.user.coverPhotoFile);
    const profilePhotoPreview = useSelector((state) => state.user.profilePhotoPreview);
    const coverPhotoPreview = useSelector((state) => state.user.coverPhotoPreview);

    useEffect(() => {
        if (username) {
            dispatch(fetchProfile(username));
        }
    }, [username, dispatch]);

    useEffect(() => {
        if (profileUser) {
            dispatch(setEditedUser(profileUser));
        }
    }, [profileUser, dispatch]);

    const handleEditClick = () => {
        dispatch(setIsEditing(true));
    };

    const handleCancelEdit = () => {
        dispatch(setIsEditing(false));
        dispatch(setEditedUser(profileUser));
        dispatch(setProfilePhotoFile(null));
        dispatch(setCoverPhotoFile(null));
        dispatch(setProfilePhotoPreview(null));
        dispatch(setCoverPhotoPreview(null));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(setEditedUser({ ...editedUser, [name]: value }));
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'profile') {
                    dispatch(setProfilePhotoFile(file));
                    dispatch(setProfilePhotoPreview(reader.result));
                } else if (type === 'cover') {
                    dispatch(setCoverPhotoFile(file));
                    dispatch(setCoverPhotoPreview(reader.result));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateProfile(editedUser)).unwrap();

            if (profilePhotoFile) {
                await handleProfilePhotoUpload(profilePhotoFile);
            }

            if (coverPhotoFile) {
                await handleCoverPhotoUpload(coverPhotoFile);
            }

            dispatch(setIsEditing(false));
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleProfilePhotoUpload = async (file) => {
        const formData = new FormData();
        formData.append('profilePhoto', file);

        try {
            const response = await axiosInstance.post('/profile/me/profilePhoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(updateProfilePhoto(response.data.profilePhoto));
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
            dispatch(updateCoverPhoto(response.data.coverPhoto));
        } catch (error) {
            console.error('Error uploading cover photo:', error);
        }
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>{error}</div>;
    if (!profileUser) return <div>User not found</div>;

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__cover">
                    <img src={coverPhotoPreview || getImageOrPlaceholder(profileUser.coverPhoto, '/default-cover.png')} alt="Cover" />
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
                            src={profilePhotoPreview || getImageOrPlaceholder(profileUser.profilePhoto, '/default-profile.png')} 
                            alt={`${profileUser.username}'s profile`} 
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
                        <h1 className="profile__name">{profileUser.username}</h1>
                        <p className="profile__bio">{profileUser.bio}</p>
                        {currentUser && currentUser.username === profileUser.username && (
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
                        <>
                            <ProfileSearch />
                            <Routes>
                                <Route path="" element={<Timeline />} />
                                <Route path="about" element={<About />} />
                                <Route path="friends" element={<FriendsList username={username} />} />
                                <Route path="photos" element={<Photos />} />
                                <Route path="more" element={<More />} />
                            </Routes>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
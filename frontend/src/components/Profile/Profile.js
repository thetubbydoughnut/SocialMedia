import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelectors, fetchProfile, 
    updateProfile, 
    updateProfilePhoto, 
    updateCoverPhoto,
    setEditedUser, 
    setIsEditing, 
    setProfilePhotoFile, 
    setCoverPhotoFile, 
    setProfilePhotoPreview, 
    setCoverPhotoPreview } from '../../slices/profileSlice';
import { authSelectors } from '../../slices/authSlice';
import { axiosInstance } from '../../utils/axiosInstance';
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

    const currentUser = useSelector(authSelectors.selectUser);
    const profileUser = useSelector(profileSelectors.selectProfileUser);
    const status = useSelector(profileSelectors.selectProfileStatus);
    const error = useSelector(profileSelectors.selectProfileError);
    const isEditing = useSelector(profileSelectors.selectIsEditing);
    const editedUser = useSelector(profileSelectors.selectEditedUser);
    const profilePhotoFile = useSelector(profileSelectors.selectProfilePhotoFile);
    const coverPhotoFile = useSelector(profileSelectors.selectCoverPhotoFile);
    const profilePhotoPreview = useSelector(profileSelectors.selectProfilePhotoPreview);
    const coverPhotoPreview = useSelector(profileSelectors.selectCoverPhotoPreview);

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

    const handleSaveProfile = async () => {
        try {
            await dispatch(updateProfile(editedUser)).unwrap();
            if (profilePhotoFile) {
                await dispatch(updateProfilePhoto(profilePhotoFile)).unwrap();
            }
            if (coverPhotoFile) {
                await dispatch(updateCoverPhoto(coverPhotoFile)).unwrap();
            }
            dispatch(setIsEditing(false));
        } catch (err) {
            console.error('Failed to save profile:', err);
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
        </div>
    );
};

export default Profile;
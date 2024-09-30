import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser as fetchCurrentUser } from '../../slices/userSlice';
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

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                username: user.username,
                bio: user.bio,
            };

            await axiosInstance.put('/profile/me', updatedData);

            if (profilePhotoFile) {
                await handleProfilePhotoUpload(profilePhotoFile);
            }

            if (coverPhotoFile) {
                await handleCoverPhotoUpload(coverPhotoFile);
            }

            setIsEditing(false);
            dispatch(fetchCurrentUser());
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__cover">
                    <img src={coverPhotoPreview || getImageOrPlaceholder(user.coverPhoto)} alt="Cover" />
                </div>
            </div>
            <div className="profile__info">
                <div className="profile__info-left">
                    <img 
                        src={profilePhotoPreview || getImageOrPlaceholder(user.profilePhoto, '/default-profile.png')} 
                        alt={`${user.username}'s profile`} 
                        className="profile__photo" 
                    />
                    <div className="profile__details">
                        <h1 className="profile__name">{user.username}</h1>
                        <p className="profile__bio">{user.bio}</p>
                        {currentUser && currentUser.username === user.username && (
                            <button onClick={() => setIsEditing(true)} className="profile__edit-button">
                                Edit Profile
                            </button>
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
                    <Routes>
                        <Route path="" element={<Timeline />} />
                        <Route path="about" element={<About />} />
                        <Route path="friends" element={<FriendsList username={username} />} />
                        <Route path="photos" element={<Photos />} />
                        <Route path="more" element={<More />} />
                    </Routes>
                </div>
            </div>
            {isEditing && (
                <div className="profile__edit-form">
                    {/* Your existing edit form content */}
                </div>
            )}
        </div>
    );
};


export default Profile;
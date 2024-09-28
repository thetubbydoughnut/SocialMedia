import React, { useState, useEffect } from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
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
    const { username } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.user);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);
    const [coverPhotoFile, setCoverPhotoFile] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null); // Add this line
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null); // Add this line

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/profile/username/${username}`);
                setUser(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

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

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        setProfilePhotoFile(file);
        setProfilePhotoPreview(URL.createObjectURL(file)); // Add this line
    };

    const handleCoverPhotoChange = (e) => {
        const file = e.target.files[0];
        setCoverPhotoFile(file);
        setCoverPhotoPreview(URL.createObjectURL(file)); // Add this line
    };

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__cover">
                    <img src={coverPhotoPreview || getImageOrPlaceholder(user.coverPhoto)} alt="Cover" />
                </div>
                <div className="profile__info">
                    <img src={profilePhotoPreview || getImageOrPlaceholder(user.profilePhoto)} alt="Profile" className="profile__photo" />
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
            </div>
            {isEditing ? (
                <form onSubmit={handleSaveProfile} className="profile__edit-form">
                    <label className="profile__edit-label">Username</label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="profile__edit-input"
                        required
                    />
                    <label className="profile__edit-label">Bio</label>
                    <textarea
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        className="profile__edit-textarea"
                    ></textarea>
                    <label className="profile__edit-label">Profile Photo</label>
                    <input
                        type="file"
                        onChange={handleProfilePhotoChange} // Update this line
                        className="profile__edit-file-input"
                    />
                    <label className="profile__edit-label">Cover Photo</label>
                    <input
                        type="file"
                        onChange={handleCoverPhotoChange} // Update this line
                        className="profile__edit-file-input"
                    />
                    <button type="submit" className="profile__save-button">Save</button>
                </form>
            ) : (
                <div className="profile__body">
                    <nav className="profile__nav">
                        <Link to="timeline">Timeline</Link>
                        <Link to="about">About</Link>
                        <Link to="friends">Friends</Link>
                        <Link to="photos">Photos</Link>
                        <Link to="more">More</Link>
                    </nav>
                    <div className="profile__content">
                        <Routes>
                            <Route path="timeline" element={<Timeline />} />
                            <Route path="about" element={<About />} />
                            <Route path="friends" element={<FriendsList />} />
                            <Route path="photos" element={<Photos />} />
                            <Route path="more" element={<More />} />
                        </Routes>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
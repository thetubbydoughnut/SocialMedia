import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { getImageOrPlaceholder } from '../../utils/imageUtils';
import './Profile.css';
import Timeline from '../Timeline/Timeline';
import About from '../About/About';
import FriendsList from '../FriendsList/FriendsList';
import Photos from '../Photos/Photos';
import More from '../More/More';
import sampleFriends from '../../data/sampleFriends';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/profile/${id}`);
            setUser(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching user:', err);
            setError('Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>User not found</div>;

    const toggleEditProfile = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                username: user.username,
                bio: user.bio,
                // Handle profilePhoto and coverPhoto if uploading to the server
            };
            const response = await axiosInstance.put(`/profile/${id}`, updatedData);
            setUser(response.data);
            // Implement save profile logic here
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error (e.g., show a notification)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleProfilePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const form = new FormData();
            form.append('profilePhoto', file);
            try {
                const response = await axiosInstance.post(`/profile/${id}/upload/profilePhoto`, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setUser((prevData) => ({
                    ...prevData,
                    profilePhoto: getImageOrPlaceholder(response.data.profilePhoto, 'https://via.placeholder.com/150'),
                }));
            } catch (error) {
                console.error('Error uploading profile photo:', error);
            }
        }
    };

    const handleCoverPhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const form = new FormData();
            form.append('coverPhoto', file);
            try {
                const response = await axiosInstance.post(`/profile/${id}/upload/coverPhoto`, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setUser((prevData) => ({
                    ...prevData,
                    coverPhoto: getImageOrPlaceholder(response.data.coverPhoto, 'https://via.placeholder.com/150'),
                }));
            } catch (error) {
                console.error('Error uploading cover photo:', error);
            }
        }
    };

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__cover">
                    <img src={user.coverPhoto} alt="Cover" />
                    {/* Implement edit cover photo logic here */}
                </div>
                <div className="profile__info">
                    <img src={user.profilePhoto} alt="Profile" className="profile__photo" />
                    {/* Implement edit profile photo logic here */}
                    {/* Implement edit profile form logic here */}
                </div>
            </div>
            <div className="profile__body">
                <div className="profile__sidebar">
                    <Link to={`/profile/${id}/timeline`} className="profile__sidebarOption">Timeline</Link>
                    <Link to={`/profile/${id}/about`} className="profile__sidebarOption">About</Link>
                    <Link to={`/profile/${id}/friends`} className="profile__sidebarOption">Friends</Link>
                    <Link to={`/profile/${id}/photos`} className="profile__sidebarOption">Photos</Link>
                    <Link to={`/profile/${id}/more`} className="profile__sidebarOption">More</Link>
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
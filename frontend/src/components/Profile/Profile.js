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
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.user);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
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
        };

        fetchProfile();
    }, [id]);

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
            setIsEditing(false);
            // Refresh current user data if editing own profile
            if (currentUser && currentUser.id === user.id) {
                dispatch(fetchCurrentUser());
            }
            // Optionally, show a success notification
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <div className="profile">
            <div className="profile__header">
                <img src={getImageOrPlaceholder(user.coverPhoto)} alt="Cover" className="profile__coverPhoto" />
                <img src={getImageOrPlaceholder(user.profilePhoto)} alt="Profile" className="profile__profilePhoto" />
                <h2>{user.username}'s Profile</h2>
                {currentUser && currentUser.id === user.id && (
                    <button onClick={toggleEditProfile}>
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                )}
            </div>
            {isEditing ? (
                <form onSubmit={handleSaveProfile} className="profile__editForm">
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Username"
                        required
                    />
                    <textarea
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        placeholder="Bio"
                    ></textarea>
                    {/* Add fields for profilePhoto and coverPhoto if needed */}
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div className="profile__info">
                    <p>{user.bio}</p>
                </div>
            )}
            <nav className="profile__nav">
                <Link to="timeline">Timeline</Link>
                <Link to="about">About</Link>
                <Link to="friends">Friends</Link>
                <Link to="photos">Photos</Link>
                <Link to="more">More</Link>
            </nav>
            <Routes>
                <Route path="timeline" element={<Timeline />} />
                <Route path="about" element={<About />} />
                <Route path="friends" element={<FriendsList />} />
                <Route path="photos" element={<Photos />} />
                <Route path="more" element={<More />} />
            </Routes>
        </div>
    );
}

export default Profile;
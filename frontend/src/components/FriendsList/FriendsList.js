import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import './FriendsList.css';
import Friends from './Friends'; // Import the Friends component

const FriendsList = ({ username }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axiosInstance.get(`/profile/${username}/friends`);
                setFriends(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching friends:', error);
                setError('Failed to fetch friends');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchFriends();
        }
    }, [username]);

    if (loading) return <div>Loading friends...</div>;
    if (error) return <div>{error}</div>;
    if (friends.length === 0) return <div>No friends found.</div>;

    return (
        <div className="friendsList">
            <h2>Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>
                        <Friends friend={friend} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import './FriendsList.css';

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axiosInstance.get('/friends/list');
                setFriends(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching friends:', error);
                setError('Failed to fetch friends');
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    if (loading) return <div>Loading friends...</div>;
    if (error) return <div>{error}</div>;
    if (friends.length === 0) return <div>No friends found.</div>;

    return (
        <div className="friendsList">
            <h2>Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>
                        <img src={friend.profilePhoto} alt={friend.username} className="friend__photo" />
                        <span>{friend.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const FriendList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axiosInstance.get('/friends/list');
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div>
            <h2>Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>{friend.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendList;
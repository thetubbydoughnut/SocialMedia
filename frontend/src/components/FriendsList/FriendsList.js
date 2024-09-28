import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFriends } from '../../slices/friendsSlice';
import Friends from './Friends';
import './FriendsList.css';

const FriendsList = ({ username }) => {
    const dispatch = useDispatch();
    const { friends, status, error } = useSelector((state) => state.friends);

    useEffect(() => {
        if (username) {
            dispatch(fetchFriends(username));
        }
    }, [dispatch, username]);

    if (status === 'loading') return <div>Loading friends...</div>;
    if (status === 'failed') return <div>{error}</div>;
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
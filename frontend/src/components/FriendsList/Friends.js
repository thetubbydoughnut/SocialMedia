import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend } from '../../slices/userSlice';
import './Friends.css';

const Friends = ({ friend }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.user);
    const isFriend = currentUser && currentUser.friends ? currentUser.friends.includes(friend.id) : false;

    const handleAddFriend = () => {
        dispatch(addFriend(friend.id));
    };

    return (
        <div className="friend">
            <img src={friend.profilePhoto || 'https://via.placeholder.com/150'} alt={friend.username} className="friend-picture" />
            <div className="friend-info">
                <h3>{friend.username}</h3>
                <p>{friend.bio}</p>
                {!isFriend && (
                    <button onClick={handleAddFriend} className="add-friend-button">
                        Add Friend
                    </button>
                )}
            </div>
        </div>
    );
};

export default Friends;
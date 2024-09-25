import React from 'react';
import Friends from './Friends';
import './FriendsList.css';

const FriendsList = ({ friends }) => {
    return (
        <div className="friends-list">
            <h2>Friends</h2>
            {friends.map(friend => (
                <Friends key={friend.id} friend={friend} />
            ))}
        </div>
    );
};

export default FriendsList;
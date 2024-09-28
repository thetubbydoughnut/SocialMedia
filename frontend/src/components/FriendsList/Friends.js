import React from 'react';
import './Friends.css';

const Friends = ({ friend }) => {
    return (
        <div className="friend">
            <img src={friend.profilePhoto} alt={friend.username} className="friend-picture" />
            <div className="friend-info">
                <h3>{friend.username}</h3>
                <p>{friend.bio}</p>
            </div>
        </div>
    );
};

export default Friends;
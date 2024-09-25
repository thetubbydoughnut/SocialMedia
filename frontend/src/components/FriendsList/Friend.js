import React from 'react';
import './Friend.css';

const Friend = ({ friend }) => {
    return (
        <div className="friend">
            <img src={friend.picture} alt={friend.name} className="friend-picture" />
            <div className="friend-info">
                <h3>{friend.name}</h3>
                <p>{friend.bio}</p>
            </div>
        </div>
    );
};

export default Friend;
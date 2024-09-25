import React from 'react';
import Friend from './Friend';
import sampleFriends from '../../data/sampleFriends.js';
import './FriendsList.css';

const FriendsList = () => {
    return (
        <div className="friends-list">
            <h2>Friends</h2>
            {sampleFriends.map(friend => (
                <Friend key={friend.id} friend={friend} />
            ))}
        </div>
    );
};

export default FriendsList;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends, sendFriendRequest, acceptFriendRequest, removeFriend } from '../../redux/friendsSlice';
import './Friends.css';

const Friends = () => {
  const dispatch = useDispatch();
  const { friends = [], friendRequests = [] } = useSelector(state => state.friends) || {};

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleSendRequest = (userId) => {
    dispatch(sendFriendRequest(userId));
  };

  const handleAcceptRequest = (requestId) => {
    dispatch(acceptFriendRequest(requestId));
  };

  const handleRemoveFriend = (friendId) => {
    dispatch(removeFriend(friendId));
  };

  return (
    <div className="friends-container">
      <h2>Friends</h2>
      <div className="friends-list">
        {friends.map(friend => (
          <div key={friend.id} className="friend-card">
            <img src={friend.avatar} alt={friend.username} className="avatar" />
            <span>{friend.username}</span>
            <button onClick={() => handleRemoveFriend(friend.id)}>Remove Friend</button>
          </div>
        ))}
      </div>
      <h3>Friend Requests</h3>
      <div className="friend-requests">
        {friendRequests.map(request => (
          <div key={request.id} className="request-card">
            <img src={request.sender.avatar} alt={request.sender.username} className="avatar" />
            <span>{request.sender.username}</span>
            <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FriendsList from '../FriendsList/FriendsList'; // Import the FriendsList component
import './Sidebar.css';

const Sidebar = () => {
    const user = useSelector((state) => state.user.user);

    if (!user) {
        return <div>Loading...</div>;
    }

    const { username } = user;

    return (
        <div className="sidebar">
            <h2>{username}'s Sidebar</h2>
            <div className="sidebar__option"><Link to={`/profile/${username}`}>Profile</Link></div>
            <div className="sidebar__option"><Link to="/messenger">Messages</Link></div>
            <div className="sidebar__option"><Link to="/groups">Groups</Link></div>
            <div className="sidebar__option"><Link to="/events">Events</Link></div>
            <div className="sidebar__option"><Link to="/marketplace">Marketplace</Link></div>
            <div className="sidebar__friends">
                <FriendsList username={username} /> {/* Pass the current user's username to the FriendsList component */}
            </div>
        </div>
    );
};

export default Sidebar;
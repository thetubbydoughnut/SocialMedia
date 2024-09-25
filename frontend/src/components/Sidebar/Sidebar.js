import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const username = 'currentUsername'; // Replace with actual logic to get the current user's username

    return (
        <div className="sidebar">
            <div className="sidebar__option"><Link to={`/profile/${username}`}>Profile</Link></div>
            <div className="sidebar__option"><Link to="/messenger">Messages</Link></div>
            <div className="sidebar__option"><Link to="/groups">Groups</Link></div>
            <div className="sidebar__option"><Link to="/events">Events</Link></div>
            <div className="sidebar__option"><Link to="/marketplace">Marketplace</Link></div>
        </div>
    );
};

export default Sidebar;
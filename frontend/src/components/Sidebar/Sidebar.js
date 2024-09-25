import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__option">Profile</div>
            <div className="sidebar__option">Messages</div>
            <div className="sidebar__option">Groups</div>
            <div className="sidebar__option">Events</div>
        </div>
    );
};

export default Sidebar;
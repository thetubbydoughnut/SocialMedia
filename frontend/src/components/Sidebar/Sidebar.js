import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext';
import './Sidebar.css';

const Sidebar = () => {
    const { id } = useUser();

    return (
        <div className="sidebar">
            <div className="sidebar__option"><Link to={`/profile/${id}`}>Profile</Link></div>
            <div className="sidebar__option"><Link to="/messenger">Messages</Link></div>
            <div className="sidebar__option"><Link to="/groups">Groups</Link></div>
            <div className="sidebar__option"><Link to="/events">Events</Link></div>
            <div className="sidebar__option"><Link to="/marketplace">Marketplace</Link></div>
        </div>
    );
};

export default Sidebar;
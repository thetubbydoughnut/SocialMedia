import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext';
import './Sidebar.css';

const Sidebar = () => {
    const user = useUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    const { id, username } = user;
    return (
        <div className="sidebar">
            <h2>{username}'s Sidebar</h2>
            <div className="sidebar__option"><Link to={`/profile/${id}`}>Profile</Link></div>
            <div className="sidebar__option"><Link to="/messenger">Messages</Link></div>
            <div className="sidebar__option"><Link to="/groups">Groups</Link></div>
            <div className="sidebar__option"><Link to="/events">Events</Link></div>
            <div className="sidebar__option"><Link to="/marketplace">Marketplace</Link></div>
        </div>
    );
};

export default Sidebar;
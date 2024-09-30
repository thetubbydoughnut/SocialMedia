import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FriendsList from '../FriendsList/FriendsList'; // Import the FriendsList component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faUsers, faCalendarAlt, faStore } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { profileSelectors } from '../../slices/profileSlice';

const Sidebar = () => {
    const user = useSelector(profileSelectors.selectUser);
    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return <div>Loading...</div>;
    }

    const { username } = user;

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar__handle" onClick={() => setIsOpen(!isOpen)}>
                <span className="sidebar__handle-icon">{isOpen ? '▼' : '▲'}</span>
            </div>
            <div className="sidebar__content">
                <nav className="sidebar__nav">
                    <Link to={`/profile/${username}`}><FontAwesomeIcon icon={faUser} /> Profile</Link>
                    <Link to="/messenger"><FontAwesomeIcon icon={faEnvelope} /> Messages</Link>
                    <Link to="/groups"><FontAwesomeIcon icon={faUsers} /> Groups</Link>
                    <Link to="/events"><FontAwesomeIcon icon={faCalendarAlt} /> Events</Link>
                    <Link to="/marketplace"><FontAwesomeIcon icon={faStore} /> Marketplace</Link>
                </nav>
                <div className="sidebar__friends">
                    <FriendsList />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
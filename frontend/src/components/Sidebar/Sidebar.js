import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
	return (
		<div className="sidebar">
			<ul>
				<li><Link to="/profile">Profile</Link></li>
				<li><Link to="/friends">Friends</Link></li>
				<li><Link to="/messages">Messages</Link></li>
				<li><Link to="/events">Events</Link></li>
				<li><Link to="/groups">Groups</Link></li>
			</ul>
		</div>
	);
};

export default Sidebar;
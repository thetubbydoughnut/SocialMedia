import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ toggleSidebar }) => {
	return (
		<>
			<div className="sidebar-overlay" onClick={toggleSidebar}></div>
			<div className="sidebar">
				<nav className="sidebar__nav">
					<ul>
						<li><Link to="/profile" onClick={toggleSidebar}>Profile</Link></li>
						<li><Link to="/friends" onClick={toggleSidebar}>Friends</Link></li>
							<li><Link to="/messages" onClick={toggleSidebar}>Messages</Link></li>
							<li><Link to="/events" onClick={toggleSidebar}>Events</Link></li>
							<li><Link to="/groups" onClick={toggleSidebar}>Groups</Link></li>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Sidebar;
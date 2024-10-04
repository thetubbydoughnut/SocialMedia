import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = ({ toggleDarkMode }) => {
  const notifications = useSelector(state => state.notifications) || [];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          YourAppName
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-links">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/notifications" className="nav-links">
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={toggleDarkMode} className="nav-links dark-mode-toggle">
              Toggle Dark Mode
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import './Navbar.css';

const Navbar = ({ toggleDarkMode }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const notifications = useSelector(state => state.notifications) || [];
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          YourAppName
        </Link>
        <ul className="nav-menu">
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-links">Home</Link>
              </li>
              <li className="nav-item">
                <Link to={`/user/${user.username}`} className="nav-links">Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/friends" className="nav-links">Friends</Link>
              </li>
              <li className="nav-item">
                <Link to="/marketplace" className="nav-links">Marketplace</Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-links">Search</Link>
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
                <button onClick={handleLogout} className="nav-links logout-button">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">Register</Link>
              </li>
            </>
          )}
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
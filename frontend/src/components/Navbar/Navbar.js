import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { useNotifications } from '../../contexts/NotificationContext';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <Link to="/" className="navbar__logo">MyApp</Link>
        </div>
        <div className="navbar__right">
          {unreadCount > 0 && <span className="navbar__notifications">{unreadCount}</span>}
          {user ? (
            <>
              <Link to={`/profile/${user.username}`} className="navbar__link">{user.username}</Link>
              <button onClick={handleLogout} className="navbar__button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__link">Login</Link>
              <Link to="/register" className="navbar__link navbar__link--highlight">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
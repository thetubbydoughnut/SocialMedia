import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { useNotifications } from '../../contexts/NotificationContext';
import Sidebar from '../Sidebar/Sidebar';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__left">
            {!isAuthPage && user && (
              <button className="navbar__hamburger" onClick={toggleSidebar}>
                ☰
              </button>
            )}
            <Link to="/" className="navbar__logo">MyApp</Link>
          </div>
          {!isAuthPage && user ? (
            <div className="navbar__right">
              {unreadCount > 0 && <span className="navbar__notifications">{unreadCount}</span>}
              <Link to={`/profile/${user.username}`} className="navbar__link">{user.username}</Link>
              <button onClick={handleLogout} className="navbar__button">Logout</button>
            </div>
          ) : (
            <div className="navbar__right">
              <Link to="/login" className="navbar__link">Login</Link>
              <Link to="/register" className="navbar__link navbar__link--highlight">Register</Link>
            </div>
          )}
        </div>
      </nav>
      {isSidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}
    </>
  );
};

export default Navbar;
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { setLocation, setNavbarVisibility } from '../../slices/profileSlice';
import { authSelectors } from '../../slices/authSlice';
import { profileSelectors } from '../../slices/profileSlice';
import { clearAuthToken } from '../../utils/authUtils';
import './Navbar.css';
import SearchBar from '../Searchbar/SearchBar';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { useTheme } from '../../ThemeContext'; // Import ThemeContext
import { NotificationContext } from '../../contexts/NotficationContext';
import NotificationIcon from '../Notifications/NotificationIcon';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector(authSelectors.selectUser);
  const location = useSelector(profileSelectors.selectLocation);
  const isNavbarVisible = useSelector(profileSelectors.selectIsNavbarVisible);
  
  const { theme, toggleTheme } = useTheme(); // Destructure theme and toggleTheme from context
  const lastScrollY = useRef(0);
  const { notifications } = useContext(NotificationContext);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    document.body.className = theme; // Apply theme class to body

    const handleScroll = () => {
      if (lastScrollY.current < window.scrollY) {
        dispatch(setNavbarVisibility(false));
      } else {
        dispatch(setNavbarVisibility(true));
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    clearAuthToken();
    navigate('/login');
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    dispatch(setLocation(newLocation));
  };

  return (
    <div className={`header ${isNavbarVisible ? 'header--visible' : ''}`}>
      <div className="header__left">
        <Link to="/" className="header__logo">MyApp</Link>
        <HamburgerMenu />
      </div>
      <div className="header__center">
        {user && <SearchBar />}
      </div>
      <div className="header__right">
        <div className="header__location-wrapper">
          <span className="header__location-label">Location:</span>
          <select value={location} onChange={handleLocationChange} className="header__location-select">
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="CA">CA</option>
          </select>
        </div>
        <button onClick={toggleTheme} className="header__theme-button">
          Toggle Theme
        </button>
        <button onClick={() => {/* Toggle Notifications Dropdown */}}>
          Notifications {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </button>
        {user ? (
          <>
            <button onClick={handleLogout} className="header__logout-button auth-button">
              Logout
            </button>
            <Link to={`/profile/${user.username}`} className="header__profile-link">
              <img 
                src={user.profilePhoto || '/default-profile.png'} 
                alt="Profile" 
                className="header__profileImage" 
              />
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-button header__login-button">Login</Link>
            <Link to="/register" className="auth-button header__register-button">Register</Link>
          </>
        )}
      </div>
      <NotificationIcon />
    </div>
  );
};

export default Header;
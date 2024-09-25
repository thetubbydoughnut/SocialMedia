import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout } from '../../slices/userSlice';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { useTheme } from '../../ThemeContext';
import './Navbar.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <header className="header">
      <HamburgerMenu onToggle={handleMenuToggle} />
      {user ? (
        <>
          <ul className={`nav-links ${isMenuOpen ? 'hidden' : ''}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/newsfeed">News Feed</Link></li>
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/watch">Watch</Link></li>
            <li><Link to={`/profile/${user.id}`}>Profile</Link></li>
            <li><Link to="/messenger">Messenger</Link></li>
          </ul>
          <div className="header__right">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
            <button onClick={handleLogout} className="auth-button">Logout</button>
          </div>
        </>
      ) : (
        <div className="header__right">
          <button onClick={() => navigate('/login')} className="auth-button">Login</button>
          <button onClick={() => navigate('/register')} className="auth-button">Register</button>
        </div>
      )}
    </header>
  );
};

export default Header;
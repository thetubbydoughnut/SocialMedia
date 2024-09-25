import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { useTheme } from '../../ThemeContext';
import './Navbar.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <HamburgerMenu />
      {token ? (
        <>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/newsfeed">News Feed</Link></li>
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/watch">Watch</Link></li>
            <li><Link to="/profile">Profile</Link></li>
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
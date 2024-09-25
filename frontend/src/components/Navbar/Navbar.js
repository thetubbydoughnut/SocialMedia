import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { useTheme } from '../../ThemeContext';
import './Navbar.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <HamburgerMenu />
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/newsfeed">News Feed</Link></li>
        <li><Link to="/marketplace">Marketplace</Link></li>
        <li><Link to="/watch">Watch</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/messenger">Messenger</Link></li>
      </ul>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  );
};

export default Header;
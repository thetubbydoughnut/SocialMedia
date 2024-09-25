import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <HamburgerMenu />
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/newsfeed">News Feed</Link></li>
                <li><Link to="/marketplace">Marketplace</Link></li>
                <li><Link to="/watch">Watch</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
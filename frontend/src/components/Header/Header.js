import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { getImageOrPlaceholder } from '../../utils/imageUtils';
import './Header.css';

const Header = () => {
    const logo = getImageOrPlaceholder('/path/to/logo.jpg', '/path/to/placeholder/logo.jpg');

    return (
        <div className="header">
            <div className="header__left">
                <img src={logo} alt="Logo" />
                <HamburgerMenu />
            </div>
            <div className="header__middle">
                <input type="text" placeholder="Search" />
            </div>
            <div className="header__right">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/newsfeed">News Feed</Link></li>
                    <li><Link to="/marketplace">Marketplace</Link></li>
                    <li><Link to="/watch">Watch</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
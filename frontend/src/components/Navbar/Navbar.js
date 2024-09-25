import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const Navbar = () => {
    return (
        <nav>
            <HamburgerMenu />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/newsfeed">News Feed</Link></li>
                <li><Link to="/marketplace">Marketplace</Link></li>
                <li><Link to="/watch">Watch</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
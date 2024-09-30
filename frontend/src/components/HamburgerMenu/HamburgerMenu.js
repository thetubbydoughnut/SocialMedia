import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HamburgerMenu.css';
import { profileSelectors } from '../../slices/profileSlice';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(profileSelectors.selectUser);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger-container">
            <button onClick={toggleMenu} className="hamburger-button">
                ☰
            </button>
            <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
                <button onClick={toggleMenu} className="close-button">
                    ×
                </button>
                <nav className="hamburger-nav">
                    <ul>
                        <li>
                            <Link to="/" onClick={toggleMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/newsfeed" onClick={toggleMenu}>
                                News Feed
                            </Link>
                        </li>
                        <li>
                            <Link to="/marketplace" onClick={toggleMenu}>
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link to="/watch" onClick={toggleMenu}>
                                Watch
                            </Link>
                        </li>
                        {user && (
                            <li>
                                <Link to={`/profile/${user.username}`} onClick={toggleMenu}>
                                    Profile
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/messenger" onClick={toggleMenu}>
                                Messenger
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HamburgerMenu;
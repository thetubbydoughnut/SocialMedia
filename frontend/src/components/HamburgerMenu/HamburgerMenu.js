import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HamburgerMenu.css';

const HamburgerMenu = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.user.user);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleMenu} className="hamburger-button">☰</button>
            <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
                {isOpen && <button onClick={toggleMenu} className="close-button">X</button>}
                <nav className="hamburger-nav">
                    <ul>
                        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                        <li><Link to="/newsfeed" onClick={toggleMenu}>News Feed</Link></li>
                        <li><Link to="/marketplace" onClick={toggleMenu}>Marketplace</Link></li>
                        <li><Link to="/watch" onClick={toggleMenu}>Watch</Link></li>
                        {user && <li><Link to={`/profile/${user.id}`} onClick={toggleMenu}>Profile</Link></li>}
                        <li><Link to="/messenger" onClick={toggleMenu}>Messenger</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HamburgerMenu;
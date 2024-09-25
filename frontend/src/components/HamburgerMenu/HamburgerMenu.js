import React, { useState } from 'react';
import FriendsList from '../FriendsList/FriendsList';
import './HamburgerMenu.css';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger-menu">
            <button onClick={toggleMenu} className="hamburger-button">☰</button>
            {isOpen && <FriendsList />}
        </div>
    );
};

export default HamburgerMenu;
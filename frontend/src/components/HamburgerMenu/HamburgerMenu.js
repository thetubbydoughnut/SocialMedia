import React, { useState } from 'react';
import FriendsList from '../FriendsList/FriendsList';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleMenu}>☰</button>
            {isOpen && <FriendsList />}
        </div>
    );
};

export default HamburgerMenu;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import './Navbar.css';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const userStatus = useSelector((state) => state.user.status);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Removed useEffect that dispatches fetchUser

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token'); // Remove token from storage upon logout
        navigate('/login');
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <button onClick={handleMenuToggle} className="hamburger-menu">
                ☰
            </button>
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
                        <button onClick={() => { /* Implement toggleTheme if needed */ }} className="theme-toggle">
                            {/* Theme toggle icon or text */}
                            Toggle Theme
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
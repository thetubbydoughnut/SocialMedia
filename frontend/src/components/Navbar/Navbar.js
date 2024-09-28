import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import './Navbar.css';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark'); // Set initial theme to 'dark'

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token'); // Remove token from storage upon logout
        navigate('/login');
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header className="header">
            <div className="header__left">
                <Link to="/" className="header__logo">
                    MyApp
                </Link>
                <input type="text" placeholder="Search" className="header__search" />
            </div>
            <div className="header__center">
                <Link to="/" className="header__icon">
                    <i className="fas fa-home"></i>
                </Link>
                <Link to="/newsfeed" className="header__icon">
                    <i className="fas fa-newspaper"></i>
                </Link>
                <Link to="/watch" className="header__icon">
                    <i className="fas fa-tv"></i>
                </Link>
                <Link to="/marketplace" className="header__icon">
                    <i className="fas fa-store"></i>
                </Link>
                <Link to="/groups" className="header__icon">
                    <i className="fas fa-users"></i>
                </Link>
            </div>
            <div className="header__right">
                <HamburgerMenu />
                {user ? (
                    <>
                        <ul className="header__nav">
                            <li>
                                <Link to={`/profile/${user.username}`} className="header__profile">
                                    <img src={user.profilePhoto} alt="Profile" className="header__profileImage" />
                                    <span>{user.username}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/messenger" className="header__icon">
                                    <i className="fas fa-comments"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="/notifications" className="header__icon">
                                    <i className="fas fa-bell"></i>
                                </Link>
                            </li>
                        </ul>
                        <div className="header__actions">
                            <button onClick={handleLogout} className="auth-button">
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="header__auth">
                        <button onClick={() => navigate('/login')} className="auth-button">
                            Login
                        </button>
                        <button onClick={() => navigate('/register')} className="auth-button">
                            Register
                        </button>
                    </div>
                )}
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
            </div>
        </header>
    );
};

export default Header;
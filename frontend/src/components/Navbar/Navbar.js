import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice'; 
import SearchBar from '../Searchbar/SearchBar';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'; // Ensure this is imported
import './Navbar.css';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [theme, setTheme] = useState('light'); // Add theme state

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="header">
            <div className="header__left">
                <Link to="/" className="header__logo">MyApp</Link> {/* Ensure the logo is here */}
            </div>
            <div className="header__center">
                {user && <SearchBar />} {/* Conditionally render SearchBar */}
            </div>
            <div className="header__right">
                {user && <HamburgerMenu />} {/* Conditionally render HamburgerMenu */}
                {user ? (
                    <>
                        <ul className="header__nav">
                            <li>
                                <Link to={`/profile/${user.username}`} className="header__profile">
                                    <img src={user.profilePhoto || '/path/to/default/profile/photo.jpg'} alt="Profile" className="header__profileImage" />
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
                            <button onClick={toggleTheme} className="theme-toggle">
                                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                            </button>
                        </div>
                    </>
                ) : (
                  <>
                    <Link to="/login" className="auth-button">
                      Login
                    </Link>
                    <Link to="/register" className="auth-button"> {/* Ensure the register button is here */}
                      Register
                    </Link>
                  </>
                )}
            </div>
        </div>
    );
};

export default Header;
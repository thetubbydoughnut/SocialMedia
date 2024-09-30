import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setLocation, setNavbarVisibility, searchProfiles } from '../../slices/userSlice'; // Ensure setLocation is imported
import { clearAuthToken } from '../../utils/authUtils';
import './Navbar.css';
import SearchBar from '../Searchbar/SearchBar';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import axiosInstance from '../../utils/axiosInstance';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [theme, setTheme] = useState('light');
    const location = useSelector((state) => state.user.location);
    const isNavbarVisible = useSelector((state) => state.user.isNavbarVisible);
    let lastScrollY = window.scrollY;

    useEffect(() => {
        document.body.className = theme;

        const handleScroll = () => {
            if (lastScrollY < window.scrollY) {
                dispatch(setNavbarVisibility(false));
            } else {
                dispatch(setNavbarVisibility(true));
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [theme, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        clearAuthToken();
        localStorage.removeItem('username');
        navigate('/login');
    };

    const handleLocationChange = (e) => {
        const newLocation = e.target.value;
        dispatch(setLocation(newLocation));
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`header ${isNavbarVisible ? 'header--visible' : ''}`}>
            <div className="header__left">
                <Link to="/" className="header__logo">MyApp</Link>
                <HamburgerMenu />
            </div>
            <div className="header__center">
                {user && <SearchBar />}
            </div>
            <div className="header__right">
                <div className="header__location-wrapper">
                    <span className="header__location-label">Location:</span>
                    <select value={location} onChange={handleLocationChange} className="header__location-select">
                        <option value="US">US</option>
                        <option value="UK">UK</option>
                        <option value="CA">CA</option>
                    </select>
                </div>
                <button onClick={toggleTheme} className="header__theme-button">
                    Toggle Theme
                </button>
                {user ? (
                    <>
                        <button onClick={handleLogout} className="header__logout-button">
                            Logout
                        </button>
                        <Link to={`/profile/${user.username}`} className="header__profile-link">
                            <img 
                                src={user.profilePhoto || '/default-profile.png'} 
                                alt="Profile" 
                                className="header__profileImage" 
                            />
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className="header__login-button">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Header;
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import styles from './LogoutButton.module.css';

function LogoutButton() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logout());
        // Remove the token from localStorage
        localStorage.removeItem('token');
    };

    return (
        <button className={styles.logout} onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;
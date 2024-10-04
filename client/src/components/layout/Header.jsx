import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    try {
      await dispatch(logout()).unwrap(); // Use unwrap() to handle the promise
      navigate('/login'); // Navigate after logout is complete
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header>
      <nav>
        <ul>
          {user ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
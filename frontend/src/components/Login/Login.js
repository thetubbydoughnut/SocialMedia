import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../slices/authSlice';
import { authSelectors } from '../../slices/authSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector(authSelectors.selectAuthStatus);
  const authError = useSelector(authSelectors.selectAuthError);
  const user = useSelector(authSelectors.selectUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('Server error during login. Please try again later.');
      } else {
        console.error('Login error:', error.message);
      }
      // Optionally, set an error state to display to the user
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {authError && <p className="error">{authError}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={authStatus === 'loading'}>
          {authStatus === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
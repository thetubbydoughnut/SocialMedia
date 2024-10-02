import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Log in to MyApp</h2>
        <form onSubmit={handleSubmit} className="auth-form">
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
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <div className="auth-divider">
          <span>or</span>
        </div>
        <Link to="/register" className="auth-create-account">Create New Account</Link>
      </div>
    </div>
  );
};

export default Login;
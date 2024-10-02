import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../slices/authSlice';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register({ username, email, password })).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Create a New Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <div className="auth-divider">
          <span>or</span>
        </div>
        <Link to="/login" className="auth-login-link">Already have an account?</Link>
      </div>
    </div>
  );
};

export default Register;
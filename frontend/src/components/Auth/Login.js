import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice'; // Import the loginUser action
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(''); // Local error state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Clear any previous local errors
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log('Login successful:', result);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      console.error('Failed to log in:', err);
      setLocalError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Log in to MyApp</h2>
        {(error || localError) && <div className="auth-error">{error || localError}</div>}
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
          <button type="submit" className="auth-button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging in...' : 'Log In'}
          </button>
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
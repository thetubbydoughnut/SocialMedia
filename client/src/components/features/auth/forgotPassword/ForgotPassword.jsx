import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../../redux/slices/authSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email)).unwrap();
      alert('If an account with that email exists, we sent a password reset link.');
    } catch (err) {
      console.error('Failed to send reset email:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {status === 'succeeded' && <div style={{color: 'green'}}>Password reset email sent</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  );
};

export default ForgotPassword;
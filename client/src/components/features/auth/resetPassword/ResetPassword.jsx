import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../../redux/slices/authSlice';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    dispatch(resetPassword({ token, newPassword }))
      .unwrap()
      .then(() => navigate('/login'))
      .catch((error) => console.error('Failed to reset password:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm New Password"
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
};

export default ResetPassword;
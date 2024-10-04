import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../../../redux/slices/authSlice';

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyEmail(token))
      .unwrap()
      .then(() => {
        alert('Email verified successfully');
        navigate('/login');
      })
      .catch((error) => console.error('Failed to verify email:', error));
  }, [dispatch, token, navigate]);

  if (status === 'loading') {
    return <div>Verifying email...</div>;
  }

  if (error) {
    return <div style={{color: 'red'}}>{error}</div>;
  }

  return null;
};

export default EmailVerification;
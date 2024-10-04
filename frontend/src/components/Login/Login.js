import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ username, password })).unwrap();
      console.log('Login successful');
      // Redirect or update UI as needed
    } catch (error) {
      console.error('Failed to log in:', error.message || 'An unknown error occurred');
      // Update UI to show error message
    }
  };

  // Render form...
};

export default Login;
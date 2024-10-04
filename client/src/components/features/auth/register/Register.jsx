import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, clearError } from '../../../../redux/slices/authSlice';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, status, user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <input
        type="text"
        name="username"
        value={userData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="text"
        name="firstName"
        value={userData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={userData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
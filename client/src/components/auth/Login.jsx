import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Logging in...' : 'Login'}
      </button>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </form>
  );
};

export default Login;
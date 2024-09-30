import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../slices/authSlice';
import { authSelectors } from '../../slices/authSlice';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
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
            await dispatch(register({ username, email, password })).unwrap();
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    // Redirect if already logged in
    if (user) {
        navigate('/');
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {authError && <p className="error">{authError}</p>}
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
                <button type="submit" disabled={authStatus === 'loading'}>
                    {authStatus === 'loading' ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;
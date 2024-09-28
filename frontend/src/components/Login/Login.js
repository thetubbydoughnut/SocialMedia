import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import { fetchUser } from '../../slices/userSlice';
import './Login.css'; // Ensure you have styling if needed
import { saveAuthToken } from '../../utils/authUtils';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state before submission
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            const token = response.data.token;
            const username = response.data.username;
            saveAuthToken(token);
            localStorage.setItem('username', username);
            await dispatch(fetchUser(username)).unwrap();
            navigate(`/profile/${username}`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Invalid email or password');
            }
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
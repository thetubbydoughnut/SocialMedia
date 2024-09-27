import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import { fetchUser } from '../../slices/userSlice';
import './Login.css'; // Ensure you have styling if needed

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting to login with URL:', axiosInstance.defaults.baseURL + '/auth/login');
            const response = await axiosInstance.post('/auth/login', { email, password });
            const token = response.data.token;
            console.log('Token received:', token); // Debugging: Log the token
            localStorage.setItem('token', token);
            dispatch(fetchUser());
            navigate('/'); // Redirect to home or dashboard after login
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
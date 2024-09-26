import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import { fetchUser } from '../../slices/userSlice';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axiosInstance.post('/auth/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            dispatch(fetchUser()); // Fetch user after successful registration
            navigate('/'); // Redirect to home or dashboard after registration
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register">
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
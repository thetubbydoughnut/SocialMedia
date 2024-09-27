import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.user.user);
    const token = localStorage.getItem('token');

    console.log('PrivateRoute - Token:', token);
    console.log('PrivateRoute - User:', user);

    return token && user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
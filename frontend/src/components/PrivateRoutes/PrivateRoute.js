import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../slices/authSlice';

const PrivateRoute = ({ children }) => {
    const user = useSelector(authSelectors.selectUser);

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
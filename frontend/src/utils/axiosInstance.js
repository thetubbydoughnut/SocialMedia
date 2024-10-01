import axios from 'axios';
import { clearAuthToken } from './authUtils';
import store from '../store';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:9000', // Adjust if needed
    headers: { 'Content-Type': 'application/json' }
});

// Add a response interceptor
export const setupInterceptors = (navigate) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                clearAuthToken();
                navigate('/login'); // Redirect to login page
            }
            return Promise.reject(error);
        }
    );
};

export const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { axiosInstance };
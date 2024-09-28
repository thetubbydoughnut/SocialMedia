import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:9000', // Ensure this matches your backend server URL and port
    withCredentials: true, // Include credentials in requests
    headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirect to login page if unauthorized
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
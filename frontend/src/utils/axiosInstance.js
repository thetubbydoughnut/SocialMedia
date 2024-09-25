import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000', // Adjust if your API URL is different
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // Exclude auth routes from attaching the token
        if (token && !config.url.includes('/auth/')) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
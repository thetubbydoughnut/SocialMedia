import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000/api',
    // other configurations...
});

export const setupInterceptors = (store) => {
    axiosInstance.interceptors.request.use(
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

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login)
                store.dispatch({ type: 'auth/logout' });
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
  // Add other custom settings here
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
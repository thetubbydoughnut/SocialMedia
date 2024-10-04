import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 10000, // Increased to 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
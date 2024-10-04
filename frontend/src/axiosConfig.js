import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

export default instance;
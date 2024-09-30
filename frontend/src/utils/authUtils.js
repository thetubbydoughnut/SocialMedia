import { axiosInstance } from './axiosInstance';
import { jwtDecode } from 'jwt-decode';
export const loadAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    if (isTokenExpired(token)) {
      clearAuthToken();
      return false;
    }
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }
  return false;
};

export const saveAuthToken = (token) => {
  localStorage.setItem('token', token);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  delete axiosInstance.defaults.headers.common['Authorization'];
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};
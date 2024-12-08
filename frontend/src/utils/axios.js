import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Your backend base URL
});

// Add token to headers for all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token; // Set the token in headers
  }
  return config;
});

export default axiosInstance;

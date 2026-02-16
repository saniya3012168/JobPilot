import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // Check for environment variable first (most flexible)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // For production (deployed on Netlify)
  if (window.location.hostname !== 'localhost') {
    // TODO: Update this URL after deploying backend to Render
    return 'https://jobpilot-backend.onrender.com/api';
  }
  
  // For local development
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiUrl();

console.log('🔗 API URL:', API_BASE_URL); // Helpful for debugging

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 second timeout (important for Render cold starts)
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Log error for debugging
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    return Promise.reject(error);
  }
);

export default api;
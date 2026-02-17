import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // 1️⃣ Environment variable (if set in Netlify)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // 2️⃣ Production (Netlify deployed site)
  if (window.location.hostname !== 'localhost') {
    return 'https://jobpilot-k2yg.onrender.com/api';
  }

  // 3️⃣ Local development
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiUrl();

console.log('🔗 API URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // Important for Render cold starts
});

// 🔐 Request interceptor (Attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📥 Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    return Promise.reject(error);
  }
);

export default api;

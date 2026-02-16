import axios from "axios";

// ===============================
// API BASE URL
// ===============================
const getApiUrl = () => {
  // If you set REACT_APP_API_URL in Netlify, it will use that
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Production (Netlify deployed frontend)
  if (window.location.hostname !== "localhost") {
    return "https://jobpilot-k2yg.onrender.com/api";
  }

  // Local development
  return "http://localhost:5000/api";
};

const API_BASE_URL = getApiUrl();

console.log("🔗 API URL:", API_BASE_URL);

// ===============================
// AXIOS INSTANCE
// ===============================
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // Important for Render cold start
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

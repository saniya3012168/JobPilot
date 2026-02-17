import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "https://jobpilot-k2yg.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ================================
// Optional: Add Token Automatically
// ================================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

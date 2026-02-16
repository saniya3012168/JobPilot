<<<<<<< HEAD
import api from './api';

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  getCurrentUser: () => {
    return api.get('/auth/me');
  }
};
=======
import API from "./api";

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
>>>>>>> main

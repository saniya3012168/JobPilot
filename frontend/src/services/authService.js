import API from "./api";

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);

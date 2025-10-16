import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: "http://localhost:3001",
  //baseURL: "https://todo-categ.onrender.com",
});

// Add token automatically to every request (if logged in)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

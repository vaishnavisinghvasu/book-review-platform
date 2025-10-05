import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Add token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

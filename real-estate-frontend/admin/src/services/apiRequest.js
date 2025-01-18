import axios from 'axios';

const URL = `${import.meta.env.VITE_BACKEND_URL}`;
const url = "https://real-estate-app-backend-hj1p.onrender.com"

const apiRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default apiRequest;

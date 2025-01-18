import axios from 'axios';

// const URL = `${import.meta.env.VITE_BACKEND_URL}`;
const URL = "https://real-estate-app-backend-oqfh.onrender.com"

const apiRequest = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export default apiRequest;

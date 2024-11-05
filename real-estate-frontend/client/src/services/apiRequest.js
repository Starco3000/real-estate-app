import axios from 'axios';

const URL = `${import.meta.env.VITE_BACKEND_URL}`;

const apiRequest = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export default apiRequest;

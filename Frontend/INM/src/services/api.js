// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Ensure this is the correct base URL for your API
});

export default api;

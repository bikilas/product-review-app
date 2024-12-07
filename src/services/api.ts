import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-api.nova-techs.com/products', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

import axios from 'axios';
const url = 'https://anvui-be.vercel.app/';
const testUrl = 'http://localhost:5000'

const api = axios.create({
  baseURL: url, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {api}
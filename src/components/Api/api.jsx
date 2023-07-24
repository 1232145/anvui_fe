import axios from 'axios';
const url = 'https://anvui-be.vercel.app';
const testUrl = 'http://localhost:5000'

const api = axios.create({
  baseURL: testUrl, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (response) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      response.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && error.response.data.message === 'Expired token') {
      localStorage.removeItem('accessToken');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export {api}

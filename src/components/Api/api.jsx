import axios from 'axios';
const url = 'https://anvui-be.vercel.app';
const testUrl = 'http://localhost:4000'

const api = axios.create({
  baseURL: testUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = 'accessToken';

api.interceptors.request.use(
  (response) => {
    const accessToken = sessionStorage.getItem(token);
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
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response.status);
  }
)

export { api }

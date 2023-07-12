import axios from 'axios';
const url = 'https://anvui-be.vercel.app/';
const testUrl = 'http://localhost:5000'

const api = axios.create({
  baseURL: testUrl, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export {api}
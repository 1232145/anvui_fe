import axios from 'axios';

const url = 'http://localhost:5000'

const api = axios.create({
  baseURL: url, 
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Cookie': localStorage.getItem('cookie')
  },
});


export {api};
import axios from 'axios';

const url = 'https://anvui-be.vercel.app'

const api = axios.create({
  baseURL: url, 
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Cookie': localStorage.getItem('cookie')
  },
});


export {api};
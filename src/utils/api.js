import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  data: [],
  headers: { Accept: 'application/json' },
});

export default api;

import axios from 'axios';

// baseURL에 '/api'를 설정하고, 실제 API 호출 시에는 나머지 경로만 사용
// ex) /auth/login, /books, /books/1
const baseURL = '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    console.log('API Base URL:', baseURL);
    console.log('Full API URL (from env):', import.meta.env.VITE_API_URL);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 
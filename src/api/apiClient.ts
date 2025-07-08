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

// Response interceptor to handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않은 경우
      console.log('Token expired or invalid, redirecting to login page');
      
      // 토큰 삭제
      localStorage.removeItem('token');
      
      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 
import { LoginRequest, LoginResponse } from '../types/auth';
import api from '@api/config';

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  const { token } = response.data;
  
  // Save token to localStorage
  localStorage.setItem('token', token);
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
}; 

import { api } from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/v1/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/v1/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/api/v1/auth/logout');
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await api.post('/api/v1/auth/refresh');
    return response.data;
  },
};

import api from './api';

export interface AuthPayload {
  name?: string;
  email: string;
  password: string;
  role?: 'user' | 'owner';
  phone?: string;
  currentLocation?: string;
}

export const authService = {
  register: (payload: AuthPayload) => api.post('/user/register', payload).then((r) => r.data),
  login: (payload: { email: string; password: string }) =>
    api.post('/user/login', payload).then((r) => r.data),
  forgotPassword: (payload: { email: string }) =>
    api.post('/user/forgot-password', payload).then((r) => r.data),
};

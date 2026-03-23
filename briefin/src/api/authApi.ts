import { apiClient } from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const login = (body: LoginRequest) =>
  apiClient.post<LoginResponse>('/api/auth/login', body);

export const signup = (body: SignupRequest) =>
  apiClient.post<{ id: string; email: string; createdAt: string }>('/api/auth/signup', body);

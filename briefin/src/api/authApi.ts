import { apiClient, type ApiResponse } from './client';
import type { LoginRequest, SignupRequest, LoginResponse } from '@/types/auth';

export type { LoginRequest, SignupRequest, LoginResponse };

export const login = (body: LoginRequest) =>
  apiClient.post<ApiResponse<LoginResponse>>('/api/auth/login', body).then((res) => res.result);

export const signup = (body: SignupRequest) =>
  apiClient
    .post<ApiResponse<{ id: string; email: string; createdAt: string }>>('/api/auth/signup', body)
    .then((res) => res.result);

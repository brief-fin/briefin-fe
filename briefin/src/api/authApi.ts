import { apiClient, type ApiResponse } from './client';

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
  apiClient.post<ApiResponse<LoginResponse>>('/api/auth/login', body).then((res) => res.result);

export const signup = (body: SignupRequest) =>
  apiClient
    .post<ApiResponse<{ id: string; email: string; createdAt: string }>>('/api/auth/signup', body)
    .then((res) => res.result);

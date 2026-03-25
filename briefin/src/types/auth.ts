// API 요청/응답 타입
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

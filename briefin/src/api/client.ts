import { tokenStorage } from '@/lib/token';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

// 백엔드 공통 응답 wrapper
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = tokenStorage.get();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body?.message ?? `API 오류: ${res.status} ${res.statusText}`);
  }

  if (body?.isSuccess === false) {
    throw new Error(body.message ?? '알 수 없는 오류가 발생했습니다.');
  }

  return body as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

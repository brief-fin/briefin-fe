import { authStore } from '@/store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
let refreshPromise: Promise<string | null> | null = null;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 백엔드 공통 응답 wrapper
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

async function request<T>(path: string, options?: RequestInit, canRetry = true): Promise<T> {
  const token = authStore.getAccessToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers,
    ...options,
  });

  if (res.status === 401 && canRetry && !path.startsWith('/api/auth/')) {
    const newToken = await tryRefreshAccessToken();
    if (newToken) {
      return request<T>(path, options, false);
    }
    authStore.clear();
    redirectToLoginWithCurrentPath();
    throw new ApiError('인증이 만료되었습니다. 다시 로그인해주세요.', 401);
  }

  if (res.status === 403 && !path.startsWith('/api/auth/')) {
    authStore.clear();
    redirectToLoginWithCurrentPath();
    throw new ApiError('로그인이 필요합니다. 다시 로그인해주세요.', 403);
  }

  const text = await res.text();
  const body = text
    ? (() => {
        try {
          return JSON.parse(text);
        } catch {
          return null;
        }
      })()
    : null;

  if (!res.ok) {
    throw new ApiError(body?.message ?? `API 오류: ${res.status} ${res.statusText}`, res.status);
  }

  if (body?.isSuccess === false) {
    throw new Error(body.message ?? '알 수 없는 오류가 발생했습니다.');
  }

  return body as T;
}

async function tryRefreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        if (!res.ok) return null;

        const text = await res.text();
        const body = text
          ? (() => {
              try {
                return JSON.parse(text) as ApiResponse<{ accessToken: string }>;
              } catch {
                return null;
              }
            })()
          : null;

        const newToken = body?.result?.accessToken ?? null;
        if (newToken) authStore.setAccessToken(newToken);
        return newToken;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

function redirectToLoginWithCurrentPath() {
  if (typeof window === 'undefined') return;
  const redirect = `${window.location.pathname}${window.location.search}`;
  window.location.href = `/login?redirect=${encodeURIComponent(redirect || '/')}`;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

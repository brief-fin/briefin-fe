import { authStore } from '@/store/authStore';
import { authDebug } from '@/lib/authDebug';
import { markExplicitLogout, refreshAccessTokenSingleFlight } from '@/lib/refreshSession';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

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

  const isAuthPath = path.startsWith('/api/auth/');
  const isUnauthorized = res.status === 401 || res.status === 403;
  if (isUnauthorized && !isAuthPath) {
    const status = authStore.getStatus();
    authDebug('api:unauthorized', { path, status, httpStatus: res.status, canRetry });

    // checking 동안은 성급하게 로그인으로 보내지 말고 refresh 결과를 기다려본다.
    if (canRetry) {
      const newToken = await refreshAccessTokenSingleFlight(`api:${res.status}:${path}`);
      if (newToken) {
        authDebug('api:retry-after-refresh', { path });
        return request<T>(path, options, false);
      }

      // checking이 끝나기 전이면 provider refresh를 기다렸다가 1회만 더 시도
      if (status === 'checking' && !authStore.isSessionInitDone()) {
        authDebug('api:wait-session-init', { path });
        await authStore.whenSessionInitialized();
        const tokenAfterInit = authStore.getAccessToken();
        if (tokenAfterInit) {
          authDebug('api:retry-after-init', { path });
          return request<T>(path, options, false);
        }
      }
    }

    authStore.clear();
    // 여기까지 왔다는 건 "refresh로도 복구 불가" → 이후 refresh 네트워크 호출을 막는다.
    markExplicitLogout();
    authDebug('api:redirect-login', { path, httpStatus: res.status });
    redirectToLoginWithCurrentPath();
    throw new ApiError(
      res.status === 401 ? '인증이 만료되었습니다. 다시 로그인해주세요.' : '로그인이 필요합니다. 다시 로그인해주세요.',
      res.status,
    );
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

function redirectToLoginWithCurrentPath() {
  if (typeof window === 'undefined') return;
  const redirect = `${window.location.pathname}${window.location.search}`;
  window.location.href = `/login?redirect=${encodeURIComponent(redirect || '/')}`;
}

export const apiClient = {
  // options를 받아 request()로 전달 — cache: 'no-store' 등 per-request 옵션 지원
  get: <T>(path: string, options?: Omit<RequestInit, 'method'>) =>
    request<T>(path, options),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
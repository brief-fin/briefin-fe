import { authStore } from '@/store/authStore';
import { authDebug } from '@/lib/authDebug';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

const EXPLICIT_LOGOUT_KEY = 'briefin:auth:explicitLogout';
const MAY_HAVE_REFRESH_KEY = 'briefin:auth:mayHaveRefresh';

export function markMayHaveRefresh(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(MAY_HAVE_REFRESH_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function clearMayHaveRefresh(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(MAY_HAVE_REFRESH_KEY);
  } catch {
    /* ignore */
  }
}

function getMayHaveRefresh(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(MAY_HAVE_REFRESH_KEY) === '1';
  } catch {
    return false;
  }
}

/** 로그아웃 직후 ~ 다시 로그인하기 전까지 refresh 네트워크 호출을 막는다(풀 리로드 포함). */
export function markExplicitLogout(): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(EXPLICIT_LOGOUT_KEY, '1');
  } catch {
    /* ignore */
  }

  // 명시적 로그아웃이면 더 이상 refresh 시도할 이유가 없다.
  clearMayHaveRefresh();
}

export function clearExplicitLogout(): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(EXPLICIT_LOGOUT_KEY);
  } catch {
    /* ignore */
  }
}

function shouldSkipRefreshNetwork(): boolean {
  if (typeof sessionStorage !== 'undefined') {
    try {
      if (sessionStorage.getItem(EXPLICIT_LOGOUT_KEY) === '1') {
        return true;
      }
    } catch {
      /* ignore */
    }
  }

  // 과거에 로그인/refresh 성공 이력이 전혀 없으면 refresh 네트워크 호출을 하지 않는다.
  // (HttpOnly refresh 쿠키 존재 여부는 JS로 알 수 없으므로, "로그인 경험이 있는 브라우저"만 시도)
  if (!getMayHaveRefresh()) {
    return true;
  }

  // session-init 이후 비로그인으로 확정된 상태에서는 refresh 재시도가 불필요(401 연쇄 방지)
  if (
    authStore.isSessionInitDone() &&
    authStore.getStatus() === 'unauthenticated' &&
    !authStore.getAccessToken()
  ) {
    return true;
  }

  return false;
}

let inFlight: Promise<string | null> | null = null;

/**
 * refreshToken 쿠키 기반으로 accessToken을 재발급한다.
 * - 반드시 single-flight
 * - apiClient를 쓰지 않고 raw fetch 사용(401 처리와 재귀 방지)
 */
export async function refreshAccessTokenSingleFlight(reason: string): Promise<string | null> {
  if (shouldSkipRefreshNetwork()) {
    authDebug('refresh:skip', { reason });
    return null;
  }

  if (inFlight) {
    authDebug('refresh:join', { reason });
    return inFlight;
  }

  authDebug('refresh:start', { reason });
  inFlight = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        authDebug('refresh:fail-http', { reason, status: res.status });
        return null;
      }

      const text = await res.text();
      const body = text
        ? (() => {
            try {
              return JSON.parse(text) as { result?: { accessToken?: string } };
            } catch {
              return null;
            }
          })()
        : null;

      const token = body?.result?.accessToken ?? null;
      if (token) {
        clearExplicitLogout();
        markMayHaveRefresh();
        authStore.setAccessToken(token);
        authStore.setStatus('authenticated');
        authDebug('refresh:success', { reason });
      } else {
        authDebug('refresh:fail-no-token', { reason });
      }
      return token;
    } catch {
      authDebug('refresh:fail-exception', { reason });
      return null;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

export function isRefreshInFlight() {
  return !!inFlight;
}


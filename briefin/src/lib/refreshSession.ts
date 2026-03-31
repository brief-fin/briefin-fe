import { authStore } from '@/store/authStore';
import { authDebug } from '@/lib/authDebug';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

let inFlight: Promise<string | null> | null = null;

/**
 * refreshToken 쿠키 기반으로 accessToken을 재발급한다.
 * - 반드시 single-flight
 * - apiClient를 쓰지 않고 raw fetch 사용(401 처리와 재귀 방지)
 */
export async function refreshAccessTokenSingleFlight(reason: string): Promise<string | null> {
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


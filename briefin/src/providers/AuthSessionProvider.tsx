'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authStore, type AuthStatus } from '@/store/authStore';
import { authDebug } from '@/lib/authDebug';
import { refreshAccessTokenSingleFlight } from '@/lib/refreshSession';

type AuthSessionContextValue = { version: number; status: AuthStatus };
const AuthSessionContext = createContext<AuthSessionContextValue>({ version: 0, status: 'checking' });

export function useAuthSessionVersion() {
  return useContext(AuthSessionContext).version;
}

export function useAuthStatus() {
  return useContext(AuthSessionContext).status;
}

export default function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);
  const [status, setStatus] = useState<AuthStatus>('checking');

  useEffect(() => {
    let cancelled = false;
    authStore.beginSessionInit();
    authStore.setStatus('checking');
    authDebug('session:init-start');

    (async () => {
      try {
        await refreshAccessTokenSingleFlight('session-init');
      } catch {
        // ignore
      } finally {
        if (!cancelled) {
          authStore.finishSessionInit();
          authDebug('session:init-done', { status: authStore.getStatus() });
          setVersion((v) => v + 1);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const unsub = authStore.subscribe(() => {
      setStatus(authStore.getStatus());
      setVersion((v) => v + 1);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthSessionContext.Provider value={{ version, status }}>
      {children}
    </AuthSessionContext.Provider>
  );
}

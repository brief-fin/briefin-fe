'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { refresh } from '@/api/authApi';
import { authStore } from '@/store/authStore';



const AuthSessionVersionContext = createContext(0);

export function useAuthSessionVersion() {
  return useContext(AuthSessionVersionContext);
}

export default function AuthSessionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { accessToken } = await refresh();
        if (!cancelled) authStore.setAccessToken(accessToken);
      } catch {
      } finally {
        if (!cancelled) setVersion((v) => v + 1);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <AuthSessionVersionContext.Provider value={version}>{children}</AuthSessionVersionContext.Provider>;
}

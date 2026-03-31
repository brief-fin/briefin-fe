let accessToken: string | null = null;

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';
let authStatus: AuthStatus = 'checking';
let sessionInitDone = false;
let sessionInitPromise: Promise<void> | null = null;
let sessionInitResolve: (() => void) | null = null;

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l();
}

export const authStore = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token: string | null) {
    accessToken = token;
    authStatus = token ? 'authenticated' : authStatus === 'checking' ? 'checking' : 'unauthenticated';
    emit();
  },

  clear() {
    accessToken = null;
    authStatus = 'unauthenticated';
    emit();
  },

  isAuthenticated() {
    return !!accessToken;
  },

  getStatus(): AuthStatus {
    return authStatus;
  },

  setStatus(status: AuthStatus) {
    authStatus = status;
    emit();
  },

  beginSessionInit() {
    authStatus = 'checking';
    sessionInitDone = false;
    sessionInitPromise =
      sessionInitPromise ??
      new Promise<void>((resolve) => {
        sessionInitResolve = resolve;
      });
    emit();
    return sessionInitPromise;
  },

  finishSessionInit() {
    sessionInitDone = true;
    if (!accessToken && authStatus === 'checking') authStatus = 'unauthenticated';
    sessionInitResolve?.();
    sessionInitResolve = null;
    sessionInitPromise = null;
    emit();
  },

  isSessionInitDone() {
    return sessionInitDone;
  },

  whenSessionInitialized(): Promise<void> {
    if (sessionInitDone) return Promise.resolve();
    return sessionInitPromise ?? Promise.resolve();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
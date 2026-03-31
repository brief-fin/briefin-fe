export function authDebug(event: string, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'production') return;
  const payload = data ? ` ${safeStringify(data)}` : '';
  console.debug(`[auth] ${event}${payload}`);
}

function safeStringify(data: Record<string, unknown>) {
  try {
    return JSON.stringify(data);
  } catch {
    return '[unserializable]';
  }
}


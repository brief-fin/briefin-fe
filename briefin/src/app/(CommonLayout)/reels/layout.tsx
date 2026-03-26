'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthSessionVersion } from '@/providers/AuthSessionProvider';
import { authStore } from '@/store/authStore';

export default function ReelsProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const authSessionVersion = useAuthSessionVersion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (authSessionVersion === 0) return;
    const authed = authStore.isAuthenticated();
    if (!authed) {
      setReady(false);
      const redirect = pathname || '/reels';
      router.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
      return;
    }
    setReady(true);
  }, [authSessionVersion, pathname, router]);

  if (!ready) return null;

  return <>{children}</>;
}

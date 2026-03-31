'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStatus } from '@/providers/AuthSessionProvider';

export default function ReelsProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const status = useAuthStatus();

  useEffect(() => {
    if (status === 'checking') return;
    if (status !== 'authenticated') {
      const redirect = pathname || '/reels';
      router.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
      return;
    }
  }, [status, pathname, router]);

  if (status !== 'authenticated') return null;

  return <>{children}</>;
}

import { Suspense } from 'react';
import LoginSection from '@/components/login/LoginSection';

export default function LoginPage() {
  return (
    <main className="h-full w-full">
      <Suspense>
        <LoginSection />
      </Suspense>
    </main>
  );
}

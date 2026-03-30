'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-24pxr bg-surface-bg px-24pxr text-center">
      <p className="text-[80px] font-black leading-none text-primary opacity-20">500</p>

      <div className="flex flex-col gap-8pxr">
        <h1 className="fonts-heading3 text-text-primary">일시적인 오류가 발생했어요</h1>
        <p className="fonts-body text-text-secondary">잠시 후 다시 시도해 주세요.</p>
      </div>

      <div className="flex gap-12pxr">
        <button
          onClick={reset}
          className="rounded-button border border-surface-border bg-white px-24pxr py-12pxr text-[14px] font-semibold text-text-secondary transition-colors hover:bg-surface-bg">
          다시 시도
        </button>
        <Link
          href="/home"
          className="rounded-button bg-primary px-24pxr py-12pxr text-[14px] font-semibold text-white transition-opacity hover:opacity-80">
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

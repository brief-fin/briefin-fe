'use client';

import Link from 'next/link';
import { ApiError } from '@/api/client';
import { useNewsDetail } from '@/hooks/useNews';
import { useAuthSessionVersion } from '@/providers/AuthSessionProvider';
import NewsDetailClient from '@/components/news/NewsDetailClient';
import NewsDetailSkeleton from '@/components/news/NewsDetailSkeleton';

export default function NewsDetailLoader({ id }: { id: string }) {
  const authVersion = useAuthSessionVersion();
  const { data, isLoading, isError, error } = useNewsDetail(id, {
    enabled: authVersion > 0,
  });

  if (authVersion === 0 || isLoading) {
    return <NewsDetailSkeleton />;
  }

  if (isError || !data) {
    const isNotFound = error instanceof ApiError && error.status === 404;

    if (isNotFound) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-24pxr bg-surface-bg px-24pxr text-center">
          <p className="text-[80px] font-black leading-none text-primary opacity-20">404</p>
          <div className="flex flex-col gap-8pxr">
            <h1 className="fonts-heading3 text-text-primary">페이지를 찾을 수 없어요</h1>
            <p className="fonts-body text-text-secondary">주소가 잘못됐거나 삭제된 페이지예요.</p>
          </div>
          <Link
            href="/home"
            className="rounded-button bg-primary px-24pxr py-12pxr text-[14px] font-semibold text-white transition-opacity hover:opacity-80">
            홈으로 돌아가기
          </Link>
        </main>
      );
    }

    const message =
      error instanceof Error ? error.message : '뉴스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';

    return (
      <div className="min-h-screen bg-surface-bg px-24pxr py-40pxr">
        <p className="fonts-label text-center text-text-secondary">{message}</p>
      </div>
    );
  }

  return <NewsDetailClient data={data} />;
}

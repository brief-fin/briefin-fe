'use client';

import Link from 'next/link';
import AlertBanner from '@/components/common/AlertBanner';
import FeedHeroCard from '@/components/feed/FeedHeroCard';
import FeedGridCard from '@/components/feed/FeedGridCard';
import { useFeed } from '@/hooks/useFeed';

function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-16pxr">
      <div className="h-[300px] animate-pulse rounded-card bg-surface-muted sm:h-[380px]" />
      <div className="grid grid-cols-2 gap-14pxr sm:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-card border border-surface-border">
            <div className="h-[140px] animate-pulse bg-surface-muted" />
            <div className="flex flex-col gap-8pxr p-16pxr">
              <div className="h-4 w-full animate-pulse rounded bg-surface-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-surface-muted" />
              <div className="mt-4pxr h-3 w-1/2 animate-pulse rounded bg-surface-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeedPage() {
  const { data, isLoading, isError } = useFeed();

  const hero = data?.[0];
  const grid = data?.slice(1) ?? [];

  return (
    <main className="min-h-screen bg-surface-bg py-36pxr">
      {/* Header */}
      <div className="pb-20pxr">
        <h1 className="fonts-heading3">내 피드</h1>
        <p className="mt-4pxr text-[14px] text-text-muted">관심 등록한 기업의 최신 소식</p>
      </div>

      {isLoading && <FeedSkeleton />}

      {isError && (
        <p className="fonts-label py-40pxr text-center text-text-muted">뉴스를 불러오지 못했습니다.</p>
      )}

      {data && data.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-12pxr py-60pxr text-center">
          <span className="text-[48px]">📭</span>
          <p className="fonts-body font-medium text-text-primary">아직 관심 기업이 없어요</p>
          <p className="fonts-label text-text-muted">기업을 등록하면 맞춤 뉴스를 받아볼 수 있어요.</p>
          <Link
            href="/onboarding"
            className="mt-4pxr rounded-button bg-primary px-20pxr py-10pxr text-[14px] font-semibold text-white hover:opacity-80">
            관심 기업 추가하기
          </Link>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start">
          {/* 메인 콘텐츠 */}
          <div className="flex flex-1 flex-col gap-14pxr">
            {hero && <FeedHeroCard item={hero} />}
            {grid.length > 0 && (
              <div className="grid grid-cols-2 gap-14pxr sm:grid-cols-3">
                {grid.map((item) => (
                  <FeedGridCard key={item.newsId} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="flex flex-col gap-16pxr lg:w-80 lg:shrink-0">
            <AlertBanner
              title="관심 기업을 더 추가해보세요"
              description="더 많은 기업을 등록할수록 내 피드가 풍성해져요."
              buttonLabel="관심 기업 추가하기"
              buttonHref="/onboarding"
            />
          </div>
        </div>
      )}
    </main>
  );
}

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import FeedHeroCard from '@/components/feed/FeedHeroCard';
import FeedGridCard from '@/components/feed/FeedGridCard';
import FeedCompanyTimeline from '@/components/feed/FeedCompanyTimeline';
import { useFeed } from '@/hooks/useFeed';
import { useWatchlist } from '@/hooks/useUser';
import type { FeedItem } from '@/api/feedApi';

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
  const { data: watchlist } = useWatchlist();

  const companyLogoMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of (watchlist ?? [])) {
      const name = c.companyName;
      if (!name) continue;
      const logo =
        c.logoUrl ||
        (c.ticker
          ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${c.ticker}.png`
          : null);
      if (logo) map[name] = logo;
    }
    return map;
  }, [watchlist]);

  const getItemLogo = (item: FeedItem): string | null => {
    const firstName = item.relatedCompanies?.[0];
    return firstName ? (companyLogoMap[firstName] ?? null) : null;
  };

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
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E5E7EB]">
            <span className="text-[26px] font-bold leading-none text-[#9CA3AF]">!</span>
          </div>
          <p className="fonts-body font-medium text-text-primary">아직 관심 기업이 없어요</p>
          <p className="fonts-label text-text-muted">기업을 등록하면 맞춤 뉴스를 받아볼 수 있어요.</p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start">
          {/* 메인 콘텐츠 */}
          <div className="flex flex-1 flex-col gap-14pxr">
            {hero && <FeedHeroCard item={hero} logoUrl={getItemLogo(hero)} />}
            {grid.length > 0 && (
              <div className="grid grid-cols-2 gap-14pxr sm:grid-cols-3">
                {grid.map((item) => (
                  <FeedGridCard key={item.newsId} item={item} logoUrl={getItemLogo(item)} />
                ))}
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="flex flex-col gap-16pxr lg:w-80 lg:shrink-0">
            <FeedCompanyTimeline companies={watchlist ?? []} />
          </div>
        </div>
      )}

      {/* 플로팅 버튼 - 관심 기업 추가 */}
      <Link
        href="/onboarding"
        title="관심 기업 추가하기"
        className="fixed bottom-24pxr right-24pxr z-50 flex h-56pxr w-56pxr items-center justify-center rounded-full bg-primary shadow-lg transition-opacity hover:opacity-80">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Link>
    </main>
  );
}

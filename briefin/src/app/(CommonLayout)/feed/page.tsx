'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import FeedHeroCard from '@/components/feed/FeedHeroCard';
import FeedGridCard from '@/components/feed/FeedGridCard';
import FeedWatchlistBanner from '@/components/feed/FeedWatchlistBanner';
import { fetchFeed, type FeedItem } from '@/api/feedApi';
import { useWatchlist } from '@/hooks/useUser';
import { useAuthStatus } from '@/providers/AuthSessionProvider';

const PAGE_SIZE = 20;

function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-16pxr">
      <div className="bg-surface-muted h-300pxr animate-pulse rounded-card sm:h-380pxr" />
      <div className="grid grid-cols-2 gap-14pxr sm:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-card border border-surface-border">
            <div className="bg-surface-muted h-140pxr animate-pulse" />
            <div className="flex flex-col gap-8pxr p-16pxr">
              <div className="bg-surface-muted h-4 w-full animate-pulse rounded" />
              <div className="bg-surface-muted h-4 w-3/4 animate-pulse rounded" />
              <div className="bg-surface-muted mt-4pxr h-3 w-1/2 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GridSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col overflow-hidden rounded-card border border-surface-border">
          <div className="bg-surface-muted h-140pxr animate-pulse" />
          <div className="flex flex-col gap-8pxr p-16pxr">
            <div className="bg-surface-muted h-4 w-full animate-pulse rounded" />
            <div className="bg-surface-muted h-4 w-3/4 animate-pulse rounded" />
            <div className="bg-surface-muted mt-4pxr h-3 w-1/2 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </>
  );
}

function WatchlistCompanyItem({
  company,
}: {
  company: { companyId: number; name?: string; companyName?: string; ticker: string; logoUrl: string };
}) {
  const [imgError, setImgError] = useState(false);
  const name = company.companyName ?? company.name ?? '';
  const tossUrl = company.ticker
    ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${company.ticker}.png`
    : null;
  const src = !imgError && (company.logoUrl || tossUrl) ? (company.logoUrl || tossUrl)! : null;

  return (
    <Link
      href={`/companies/${company.companyId}`}
      className="hover:bg-surface-muted group flex items-center gap-10pxr rounded-xl px-12pxr py-10pxr transition-colors">
      <div className="flex h-36pxr w-36pxr shrink-0 items-center justify-center overflow-hidden rounded-button bg-surface-bg">
        {src ? (
          <Image
            src={src}
            alt={name}
            width={36}
            height={36}
            className="object-cover"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-[14px]">🏢</span>
        )}
      </div>
      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-text-primary transition-colors group-hover:text-primary">
        {name}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-text-muted transition-colors group-hover:text-primary">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </Link>
  );
}

export default function FeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isFetchingRef = useRef(false);
  const pageRef = useRef(0);
  const hasMoreRef = useRef(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const authStatus = useAuthStatus();
  const { data: watchlist, isLoading: watchlistLoading } = useWatchlist({ enabled: authStatus === 'authenticated' });

  // 초기 로드
  useEffect(() => {
    const loadInitial = async () => {
      try {
        const data = await fetchFeed(0, PAGE_SIZE);
        setItems(data);
        pageRef.current = 0;
        hasMoreRef.current = data.length === PAGE_SIZE;
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitial();
  }, []);

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current) return;
    isFetchingRef.current = true;
    setIsLoadingMore(true);
    try {
      const nextPage = pageRef.current + 1;
      const data = await fetchFeed(nextPage, PAGE_SIZE);
      pageRef.current = nextPage;
      hasMoreRef.current = data.length === PAGE_SIZE;
      setItems((prev) => {
        const existingIds = new Set(prev.map((i) => i.newsId));
        const newItems = data.filter((i) => !existingIds.has(i.newsId));
        return [...prev, ...newItems];
      });
    } catch {
      hasMoreRef.current = false;
    } finally {
      isFetchingRef.current = false;
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, items.length]);

  const hero = items[0];
  const grid = items.slice(1);

  return (
    <main className="min-h-screen bg-surface-bg py-36pxr">
      {/* Header */}
      <div className="pb-20pxr">
        <h1 className="fonts-heading3">내 피드</h1>
        <p className="mt-4pxr text-[14px] text-text-muted">관심 등록한 기업의 최신 소식</p>
      </div>

      {isLoading && <FeedSkeleton />}

      {isError && <p className="fonts-label py-40pxr text-center text-text-muted">뉴스를 불러오지 못했습니다.</p>}

      {!isLoading && !isError && items.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-12pxr py-60pxr text-center">
          <div className="h-52px flex w-52pxr items-center justify-center rounded-full bg-[#E5E7EB]">
            <span className="text-[26px] font-bold leading-none text-[#9CA3AF]">!</span>
          </div>
          <p className="fonts-body font-medium text-text-primary">아직 관심 기업이 없어요</p>
          <p className="fonts-label text-text-muted">기업을 등록하면 맞춤 뉴스를 받아볼 수 있어요.</p>
          <Link
            href="/onboarding"
            className="mt-4pxr rounded-button bg-primary px-20pxr py-10pxr text-[14px] font-semibold text-white hover:opacity-80">
            관심 기업 추가하기
          </Link>
        </div>
      )}

      {!isLoading && items.length > 0 && (
        <div className="flex flex-col gap-16pxr lg:flex-row">
          {/* 메인 콘텐츠 */}
          <div className="flex flex-1 flex-col gap-14pxr">
            {hero && <FeedHeroCard item={hero} />}
            {grid.length > 0 && (
              <div className="grid grid-cols-2 gap-14pxr sm:grid-cols-3">
                {grid.map((item) => (
                  <FeedGridCard key={item.newsId} item={item} />
                ))}
                {isLoadingMore && <GridSkeleton />}
              </div>
            )}

            {/* sentinel: 뷰포트 진입 시 다음 페이지 로드 */}
            <div ref={sentinelRef} className="h-1" />
          </div>

          {/* 사이드바 */}
          <div className="hidden lg:block lg:w-260pxr lg:shrink-0">
            <div className="sticky top-24pxr flex flex-col gap-16pxr">
              {/* 관심 기업 목록 */}
              <div className="rounded-card border border-surface-border bg-surface-white">
                <div className="flex items-center justify-between px-16pxr pt-16pxr">
                  <p className="text-[14px] font-bold text-text-primary">관심 기업</p>
                  <Link href="/mypage?tab=watchlist" className="text-[12px] text-text-muted hover:text-primary">
                    전체보기
                  </Link>
                </div>

                <div className="mt-8pxr px-4pxr pb-8pxr">
                  {watchlistLoading && (
                    <div className="flex flex-col gap-4pxr px-12pxr py-8pxr">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-10pxr">
                          <div className="bg-surface-muted h-36pxr w-36pxr animate-pulse rounded-button" />
                          <div className="bg-surface-muted h-4 flex-1 animate-pulse rounded" />
                        </div>
                      ))}
                    </div>
                  )}
                  {!watchlistLoading && (!watchlist || watchlist.length === 0) && (
                    <p className="px-12pxr py-16pxr text-[13px] text-text-muted">등록된 관심 기업이 없어요.</p>
                  )}
                  {watchlist && watchlist.length > 0 && (
                    <div className="max-h-71.25 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {watchlist.map((company) => (
                        <WatchlistCompanyItem key={company.companyId} company={company} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 관심 기업 추가 배너 */}
              <FeedWatchlistBanner />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

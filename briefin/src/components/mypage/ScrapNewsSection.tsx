'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import MyPageNewsCard from '@/components/mypage/MyPageNewsCard';
import { ScrapIcon } from '@/constants/mypageIcons';
import { fetchScrappedNews } from '@/api/userApi';
import { useDeleteScrapNews } from '@/hooks/useNews';
import { formatDateTime } from '@/utils/date';
import type { ScrapedNews } from '@/types/mypage';

const PAGE_SIZE = 10;

export default function ScrapNewsSection() {
  const [items, setItems] = useState<ScrapedNews[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [unscrappedIds, setUnscrappedIds] = useState<Set<number>>(new Set());

  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);
  const hasMoreRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { mutate: deleteScrap } = useDeleteScrapNews();

  const fetchPage = useCallback(async (page: number) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    if (page === 1) setInitialLoading(true);
    else setLoadingMore(true);
    try {
      const data = await fetchScrappedNews(page, PAGE_SIZE);
      const total = data.totalCount ?? 0;
      setItems((prev) => (page === 1 ? (data.scrapList ?? []) : [...prev, ...(data.scrapList ?? [])]));
      pageRef.current = page;
      hasMoreRef.current = page * PAGE_SIZE < total;
    } catch {
      if (page === 1) setItems([]);
    } finally {
      isFetchingRef.current = false;
      if (page === 1) setInitialLoading(false);
      else setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  // sentinel은 항상 DOM에 존재해야 observer가 마운트 시 감지 가능
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current && !isFetchingRef.current) {
          fetchPage(pageRef.current + 1);
        }
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchPage]);

  return (
    <div className="flex flex-col gap-12pxr">
      {initialLoading && (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-card border border-surface-border bg-surface-white p-16pxr">
              <div className="mb-8pxr h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </>
      )}

      {!initialLoading && items.length === 0 && (
        <div className="flex flex-col items-center gap-12pxr py-60pxr text-center">
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#E5E7EB]">
            <ScrapIcon size={22} stroke="#9CA3AF" />
          </div>
          <p className="fonts-body font-medium text-text-primary">스크랩한 뉴스가 없어요</p>
          <p className="fonts-label text-text-muted">뉴스를 읽다가 북마크 아이콘을 누르면 여기에 저장돼요.</p>
        </div>
      )}

      {items.map((news) => (
        <MyPageNewsCard
          key={news.newsId}
          newsId={news.newsId}
          title={news.title}
          summary={news.summary}
          source={news.source}
          date={formatDateTime(news.scrapedAt)}
          thumbnailUrl={news.thumbnailUrl}
          topLeftSlot={
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteScrap(news.newsId, {
                  onSuccess: () => {
                    setItems((prev) => prev.filter((n) => n.newsId !== news.newsId));
                  },
                });
                setUnscrappedIds((prev) => new Set(prev).add(news.newsId));
              }}
              aria-label="스크랩 취소"
              className="shrink-0 rounded-full pb-6pxr pr-6pxr transition-colors hover:bg-surface-bg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={unscrappedIds.has(news.newsId) ? 'none' : '#1E3A8A'}
                stroke={unscrappedIds.has(news.newsId) ? '#9CA3AF' : '#1E3A8A'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          }
        />
      ))}

      {loadingMore && (
        <>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-card border border-surface-border bg-surface-white p-16pxr">
              <div className="mb-8pxr h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </>
      )}

      {/* sentinel: 항상 DOM에 존재해야 IntersectionObserver가 감지 가능 */}
      <div ref={sentinelRef} className="h-1" />
    </div>
  );
}

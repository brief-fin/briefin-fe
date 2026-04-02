'use client';

import { useEffect, useRef } from 'react';
import { SearchComponent } from '@/components/common/SearchComponent';
import { useSearchParams } from 'next/navigation';
import { useNewsSearch } from '@/hooks/useNews';
import NewsCard from '@/components/news/NewsCard';
import NewsCardSkeleton from '@/components/news/NewsCardSkeleton';
import { toNewsItem } from '@/api/newsApi';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useNewsSearch(query);

  const results = data?.pages.flatMap((page) => page.content) ?? [];
  const totalCount = data?.pages[0]?.totalElements ?? 0;

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main className="relative flex h-full w-full flex-col pt-36pxr">
      <div className="fonts-heading3 mb-16pxr">뉴스</div>
      <SearchComponent searchPath="/news/search/result" />

      {query && (
        <div className="fonts-caption mt-20pxr text-text-muted">
          &quot;{query}&quot; 검색 결과 {isLoading ? '...' : `${totalCount}건`}
        </div>
      )}

      {isLoading && (
        <div className="mb-30pxr mt-20pxr flex flex-col gap-12pxr">
          {Array.from({ length: 5 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="mb-30pxr mt-20pxr flex flex-col gap-12pxr">
          {results.map((news) => (
            <NewsCard key={news.newsId} news={toNewsItem(news)} />
          ))}

          <div ref={bottomRef} className="py-4pxr">
            {isFetchingNextPage && (
              <p className="py-16pxr text-center text-[14px] text-text-muted">불러오는 중...</p>
            )}
          </div>
        </div>
      )}

      {!isLoading && results.length === 0 && query && (
        <div className="flex flex-col items-center justify-center gap-16pxr py-120pxr">
          <span className="text-60pxr">🔍</span>
          <div className="fonts-cardTitle text-text-primary">검색 결과가 없어요</div>
          <div className="fonts-body text-text-muted">다른 키워드로 다시 검색해 보세요.</div>
        </div>
      )}
    </main>
  );
}

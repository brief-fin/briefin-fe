'use client';

import { useEffect, useRef } from 'react';
import NewsCard from '@/components/news/NewsCard';
import NewsCardSkeleton from '@/components/news/NewsCardSkeleton';
import { NewsListProps } from '@/types/news';
import { useNewsList } from '@/hooks/useNews';
import { toNewsItem } from '@/api/newsApi';

export default function NewsList({ category }: NewsListProps) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNewsList(category);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-14pxr">
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return <p className="fonts-label py-40pxr text-center text-text-muted">뉴스를 불러오지 못했습니다.</p>;
  }

  const newsList = data.pages.flatMap((page) => (page.content ?? []).map(toNewsItem));

  return (
    <div className="flex w-full flex-col gap-14pxr">
      {newsList.length > 0 ? (
        newsList.map((news) => <NewsCard key={news.id} news={news} />)
      ) : (
        <p className="fonts-label py-40pxr text-center text-text-muted">해당 카테고리의 뉴스가 없습니다.</p>
      )}

      {/* 무한스크롤 감지 sentinel */}
      <div ref={sentinelRef} />

      {/* 다음 페이지 로딩 인디케이터 */}
      {isFetchingNextPage && (
        <div className="flex w-full flex-col gap-14pxr">
          <NewsCardSkeleton />
          <NewsCardSkeleton />
        </div>
      )}
    </div>
  );
}

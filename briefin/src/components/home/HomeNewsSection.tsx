'use client';

import NewsCard from '@/components/news/NewsCard';
import NewsCardSkeleton from '@/components/news/NewsCardSkeleton';
import { useNewsPage } from '@/hooks/useNews';
import { toNewsItem } from '@/api/newsApi';

export default function HomeNewsSection() {
  const { data, isLoading, isError } = useNewsPage(undefined, 0, 3);

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
    return <p className="fonts-label py-10 text-center text-text-muted">뉴스를 불러오지 못했습니다.</p>;
  }

  const newsList = (data.content ?? []).map(toNewsItem);

  return (
    <div className="flex w-full flex-col gap-14pxr">
      {newsList.length > 0 ? (
        newsList.map((news) => <NewsCard key={news.id} news={news} />)
      ) : (
        <p className="fonts-label py-40pxr text-center text-text-muted">뉴스가 없습니다.</p>
      )}
    </div>
  );
}

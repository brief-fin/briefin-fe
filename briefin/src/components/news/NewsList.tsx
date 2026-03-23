'use client';

import NewsCard from '@/components/news/NewsCard';
import { NewsListProps } from '@/types/news';
import { useNewsList } from '@/hooks/useNews';
import { toNewsItem } from '@/api/newsApi';

export default function NewsList({ category }: NewsListProps) {
  const { data, isLoading, isError } = useNewsList(category);

  if (isLoading) {
    return <p className="fonts-label py-40pxr text-center text-text-muted">뉴스를 불러오는 중...</p>;
  }

  if (isError || !data) {
    return <p className="fonts-label py-40pxr text-center text-text-muted">뉴스를 불러오지 못했습니다.</p>;
  }

  const newsList = data.map(toNewsItem);

  return (
    <div className="flex w-full flex-col gap-14pxr">
      {newsList.length > 0 ? (
        newsList.map((news) => <NewsCard key={news.id} news={news} />)
      ) : (
        <p className="fonts-label py-40pxr text-center text-text-muted">해당 카테고리의 뉴스가 없습니다.</p>
      )}
    </div>
  );
}

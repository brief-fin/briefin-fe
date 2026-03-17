import { NEWS_DUMMY } from '@/core/newsDummy';
import NewsCard from '@/components/common/NewsCard';

interface NewsListProps {
  category: string;
}

export default function NewsList({ category }: NewsListProps) {
  const filtered =
    category === 'all'
      ? NEWS_DUMMY
      : NEWS_DUMMY.filter((news) => news.categories.includes(category) || news.companies.includes(category));

  return (
    <div className="flex w-full flex-col gap-14pxr">
      {filtered.length > 0 ? (
        filtered.map((news) => <NewsCard key={news.id} news={news} />)
      ) : (
        <p className="fonts-label py-40pxr text-center text-text-muted">해당 카테고리의 뉴스가 없습니다.</p>
      )}
    </div>
  );
}

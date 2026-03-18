'use client';

import NewsList from '@/components/news/NewsList';
import { SearchComponent } from '@/components/common/SearchComponent';
import { useSearchParams } from 'next/navigation';
import { NEWS_DUMMY } from '@/mocks/newsDummy';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const filtered = NEWS_DUMMY.filter((news) => news.companies.includes(query) || news.categories.includes(query));
  return (
    <main className="relative flex h-full w-full flex-col pt-30pxr">
      <div className="fonts-heading3 mb-16pxr">뉴스</div>
      <SearchComponent searchPath="/news/search" />
      <div className="fonts-caption mt-20pxr text-text-muted">
        &quot;{query}&quot; 검색 결과 {filtered.length > 0 ? `${filtered.length}건` : '없음'}
      </div>
      {filtered.length > 0 ? (
        <div className="mb-30pxr mt-20pxr">
          <NewsList category={query} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-16pxr py-120pxr">
          <span className="text-60pxr">🔍</span>
          <div className="fonts-cardTitle text-text-primary">검색 결과가 없어요</div>
          <div className="fonts-body text-text-muted">다른 키워드로 다시 검색해 보세요.</div>
        </div>
      )}
    </main>
  );
}

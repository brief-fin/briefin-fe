import { Suspense } from 'react';
import TickerNav from '@/components/news/TickerNav';
import NewsList from '@/components/news/NewsList';
import { SearchComponent } from '@/components/common/SearchComponent';

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = 'all' } = await searchParams;

  return (
    <main className="min-h-screen bg-surface-bg py-36pxr">
      <h1 className="fonts-heading3 pb-16pxr">뉴스</h1>
      <SearchComponent searchPath="/news/search/result" />
      <Suspense>
        <TickerNav />
      </Suspense>
      <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start">
        {/* Left: news list */}
        <div className="flex flex-1 flex-col gap-14pxr">
          <NewsList category={category} />
        </div>
      </div>
    </main>
  );
}

import TickerNav from '@/components/news/TickerNav';
import NewsList from '@/components/news/NewsList';
import AlertBanner from '@/components/common/AlertBanner';
import { SearchComponent } from '@/components/common/SearchComponent';

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = 'all' } = await searchParams;

  return (
    <main className="min-h-screen bg-surface-bg py-36pxr">
      <h1 className="fonts-heading3 pb-16pxr">뉴스</h1>
      <SearchComponent />
      <TickerNav />
      <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start">
        {/* Left: news list */}
        <div className="flex flex-1 flex-col gap-14pxr">
          <NewsList category={category} />
        </div>

        {/* Right sidebar */}
        <section className="flex flex-col gap-16pxr lg:w-96 lg:shrink-0">
          <AlertBanner
            title="🔔 공시 알림 받기"
            description="이 기업의 새 공시·뉴스를 실시간으로 받아보세요."
            buttonLabel="알림 설정하기"
          />
        </section>
      </div>
    </main>
  );
}

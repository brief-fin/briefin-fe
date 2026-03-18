import TickerNav from '@/components/news/TickerNav';
import NewsList from '@/components/common/NewsList';
import AlertBanner from '@/components/common/AlertBanner';
import BackButton from '@/components/common/BackButton';
import { SearchComponent } from '@/components/common/SearchComponent';

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = 'all' } = await searchParams;

  return (
    <main className="min-h-screen bg-surface-bg px-24pxr py-36pxr">
      <BackButton>← 홈으로</BackButton>
      <h1 className="fonts-sectionTitle py-20pxr">전체 뉴스</h1>
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

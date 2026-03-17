import TickerNav from '@/components/news/TickerNav';
import NewsList from '@/components/common/NewsList';
import AlertBanner from '@/components/common/AlertBanner';

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = 'all' } = await searchParams;

  return (
    <main className="flex flex-col gap-22pxr bg-surface-bg">
      <TickerNav />
      <div className="flex">
        <NewsList category={category} />
        <section className="flex flex-col">
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

import TickerNav from '@/components/news/TickerNav';
import NewsList from '@/components/common/NewsList';
interface NewsPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = 'all' } = await searchParams;

  return (
    <main className="flex flex-col gap-22pxr bg-surface-bg">
      <TickerNav />
      <NewsList category={category} />
    </main>
  );
}

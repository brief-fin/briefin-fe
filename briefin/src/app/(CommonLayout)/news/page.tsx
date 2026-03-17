import TickerNav from '@/components/news/TickerNav';

interface NewsPageProps {
  searchParams: {
    category?: string;
  };
}

export default function Page({ searchParams }: NewsPageProps) {
  const category = searchParams.category ?? 'all';

  return (
    <div className="flex flex-col gap-4">
      <TickerNav />
      <div>현재 카테고리: {category}</div>
    </div>
  );
}

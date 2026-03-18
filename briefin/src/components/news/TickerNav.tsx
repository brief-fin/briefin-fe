'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TICKER_CATEGORIES } from '@/core/constants/tickerCategories';
import TickerBtn from '@/components/common/TickerBtn';

export default function TickerNav() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = searchParams.get('category') ?? 'all';

  const handleClick = (category: string) => {
    if (category === 'all') {
      router.push('/news');
    } else {
      router.push(`/news?category=${category}`);
    }
  };

  return (
    <nav className="flex gap-2 py-24pxr">
      {TICKER_CATEGORIES.map((category) => (
        <TickerBtn
          key={category.id}
          text={category.label}
          isActive={current === category.id}
          onClick={() => handleClick(category.id)}
        />
      ))}
    </nav>
  );
}

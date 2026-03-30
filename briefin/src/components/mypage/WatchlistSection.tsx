'use client';

import PushAlarmButton from '@/components/common/PushAlarmButton';
import { useWatchlist } from '@/hooks/useUser';

export default function WatchlistSection() {
  const { data: watchlist, isLoading } = useWatchlist();

  if (isLoading) {
    return <p className="py-40pxr text-center text-[14px] text-text-muted">불러오는 중...</p>;
  }

  if (!watchlist || watchlist.length === 0) {
    return <p className="py-40pxr text-center text-[14px] text-text-muted">관심 기업이 없습니다.</p>;
  }

  return (
    <div className="flex flex-col gap-12pxr">
      {watchlist.map((company) => (
        <div
          key={company.companyId}
          className="flex items-center gap-12pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
          <div className="flex h-40pxr w-40pxr shrink-0 items-center justify-center rounded-button bg-surface-bg text-[18px]">
            🏢
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-bold text-text-primary">{company.companyName}</p>
            <p className="fonts-caption">{company.ticker}</p>
          </div>
          <PushAlarmButton companyId={company.companyId} companyName={company.companyName} />
        </div>
      ))}
    </div>
  );
}

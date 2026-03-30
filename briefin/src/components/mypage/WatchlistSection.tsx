'use client';

import PushAlarmButton from '@/components/common/PushAlarmButton';
import { MOCK_WATCHLIST } from '@/mocks/feed';

export default function WatchlistSection() {
  return (
    <div className="flex flex-col gap-12pxr">
      {MOCK_WATCHLIST.map((company) => (
        <div
          key={company.id}
          className="flex items-center gap-12pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
          <div
            className={`flex h-40pxr w-40pxr shrink-0 items-center justify-center rounded-button text-[18px] ${company.bgColor}`}>
            {company.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-bold text-text-primary">{company.name}</p>
            <p className="fonts-caption">{company.sector}</p>
          </div>
          <PushAlarmButton companyId={company.id} companyName={company.name} />
        </div>
      ))}

      {MOCK_WATCHLIST.length === 0 && (
        <p className="py-40pxr text-center text-[14px] text-text-muted">관심 기업이 없습니다.</p>
      )}
    </div>
  );
}

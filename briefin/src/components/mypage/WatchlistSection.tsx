'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUnwatchCompany, useWatchlist } from '@/hooks/useUser';
import type { WatchlistCompany } from '@/types/mypage';

function CompanyLogo({ company }: { company: WatchlistCompany }) {
  const [imgError, setImgError] = useState(false);
  const tossUrl = company.ticker
    ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${company.ticker}.png`
    : null;
  const src = !imgError && (company.logoUrl || tossUrl) ? (company.logoUrl || tossUrl)! : null;

  if (src) {
    return (
      <Image
        src={src}
        alt={company.companyName ?? company.name ?? ''}
        width={52}
        height={52}
        className="object-cover"
        unoptimized
        onError={() => setImgError(true)}
      />
    );
  }
  return <span className="text-[18px]">🏢</span>;
}

export default function WatchlistSection() {
  const { data: watchlist, isLoading } = useWatchlist();
  const { mutate: unwatch, isPending } = useUnwatchCompany();

  if (isLoading) {
    return (
      <div className="flex animate-pulse flex-col gap-12pxr">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-12pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
            <div className="h-52pxr w-52pxr shrink-0 rounded-button bg-gray-200" />
            <div className="flex flex-1 flex-col gap-6pxr">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-200" />
            </div>
            <div className="flex gap-8pxr">
              <div className="h-18pxr w-18pxr rounded bg-gray-200" />
              <div className="h-18pxr w-18pxr rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center gap-12pxr py-60pxr text-center">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E5E7EB]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <p className="fonts-body font-medium text-text-primary">관심 기업이 없어요</p>
        <p className="fonts-label text-text-muted">기업 페이지에서 별 아이콘을 누르면 여기에 저장돼요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12pxr">
      {watchlist.map((company) => (
        <div
          key={company.companyId}
          className="flex items-center gap-15pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
          <div className="flex h-52pxr w-52pxr shrink-0 items-center justify-center overflow-hidden rounded-button bg-surface-bg">
            <CompanyLogo company={company} />
          </div>
          <Link href={`/companies/${company.companyId}`} className="min-w-0 flex-1 hover:opacity-70">
            <p className="text-[16px] font-bold text-text-primary">{company.companyName ?? company.name}</p>
          </Link>
          <div className="flex shrink-0 items-center gap-4pxr">
            <button
              type="button"
              onClick={() => unwatch(company.companyId)}
              disabled={isPending}
              aria-label="관심 기업 삭제"
              title="관심 기업 삭제"
              className="flex items-center p-4pxr text-text-muted transition-colors hover:text-red-500 disabled:opacity-40">
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useWatchlist } from '@/hooks/useUser';
import type { WatchlistCompany } from '@/types/mypage';

function CompanyLogo({ company }: { company: WatchlistCompany }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = company.ticker
    ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${company.ticker}.png`
    : (company.logoUrl ?? null);

  if (logoUrl && !imgError) {
    return (
      <Image
        src={logoUrl}
        alt={company.companyName}
        width={40}
        height={40}
        className="object-cover"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <span className="text-[16px] font-black text-primary">
      {company.companyName.charAt(0)}
    </span>
  );
}

export default function HomeWatchlistSection() {
  const { data: watchlist, isLoading } = useWatchlist();

  return (
    <div className="rounded-card border border-surface-border bg-surface-white p-20pxr">
      <p className="text-[15px] font-black text-text-primary">👀 내 관심 기업</p>

      {isLoading && (
        <ul className="mt-8pxr divide-y divide-surface-border">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="flex items-center gap-12pxr py-12pxr">
              <div className="h-40pxr w-40pxr shrink-0 animate-pulse rounded-full bg-surface-border" />
              <div className="flex-1 space-y-6pxr">
                <div className="h-12pxr w-24 animate-pulse rounded bg-surface-border" />
                <div className="h-10pxr w-16 animate-pulse rounded bg-surface-border" />
              </div>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && (!watchlist || watchlist.length === 0) && (
        <p className="py-20pxr text-center text-[13px] text-text-muted">
          관심 기업을 추가해보세요
        </p>
      )}

      {!isLoading && watchlist && watchlist.length > 0 && (
        <ul className="mt-8pxr divide-y divide-surface-border">
          {watchlist.map((company) => (
            <li key={company.companyId}>
              <Link
                href={`/companies/${company.companyId}`}
                className="flex items-center gap-12pxr py-12pxr transition-opacity hover:opacity-70">
                <div className="flex h-40pxr w-40pxr shrink-0 items-center justify-center overflow-hidden rounded-full border border-surface-border bg-surface-bg">
                  <CompanyLogo company={company} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-text-primary">{company.companyName}</p>
                  <p className="fonts-caption text-text-muted">{company.ticker}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

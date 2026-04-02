'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useWatchlist } from '@/hooks/useUser';
import { useAuthStatus } from '@/providers/AuthSessionProvider';
import { WatchlistIcon } from '@/constants/mypageIcons';
import type { WatchlistCompany } from '@/types/mypage';

function CompanyLogo({ company }: { company: WatchlistCompany }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = company.ticker
    ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${company.ticker}.png`
    : (company.logoUrl ?? null);

  if (logoUrl && !imgError) {
    const name = company.companyName ?? company.name ?? '';
    const altText = name.trim() ? `${name} 로고` : '회사 로고';
    return (
      <Image
        src={logoUrl}
        alt={altText}
        width={40}
        height={40}
        className="object-cover"
        unoptimized
        onError={() => setImgError(true)}
      />
    );
  }

  return <Image src="/default-company.png" alt="기본 회사 로고" width={40} height={40} className="object-cover" />;
}

export default function HomeWatchlistSection() {
  const status = useAuthStatus();
  const { data: watchlist, isLoading } = useWatchlist({ enabled: status === 'authenticated' });

  return (
    <div className="rounded-card border border-surface-border bg-surface-white p-20pxr">
      <p className="text-[15px] font-black text-text-primary">내 관심 기업</p>

      {status === 'checking' && (
        <ul className="mt-8pxr divide-y divide-surface-border">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="flex items-center gap-12pxr py-12pxr">
              <div className="h-40pxr w-40pxr shrink-0 animate-pulse rounded-full bg-surface-border" />
              <div className="flex-1 space-y-6pxr">
                <div className="h-12pxr w-24 animate-pulse rounded bg-surface-border" />
              </div>
            </li>
          ))}
        </ul>
      )}

      {status === 'unauthenticated' && (
        <p className="py-20pxr text-center text-[13px] text-text-muted">로그인하면 관심 기업을 볼 수 있어요</p>
      )}

      {status === 'authenticated' && isLoading && (
        <ul className="mt-8pxr divide-y divide-surface-border">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="flex items-center gap-12pxr py-12pxr">
              <div className="h-40pxr w-40pxr shrink-0 animate-pulse rounded-full bg-surface-border" />
              <div className="flex-1 space-y-6pxr">
                <div className="h-12pxr w-24 animate-pulse rounded bg-surface-border" />
              </div>
            </li>
          ))}
        </ul>
      )}

      {status === 'authenticated' && !isLoading && (!watchlist || watchlist.length === 0) && (
        <div className="flex flex-col items-center gap-8pxr py-24pxr text-center">
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#E5E7EB]">
            <WatchlistIcon size={22} stroke="#9CA3AF" />
          </div>
          <p className="text-[13px] font-medium text-text-primary">관심 기업이 없어요</p>
          <p className="text-[12px] text-text-muted">기업 페이지에서 하트 아이콘을 누르면 여기에 저장돼요.</p>
        </div>
      )}

      {status === 'authenticated' && !isLoading && watchlist && watchlist.length > 0 && (
        <ul className="mt-8pxr max-h-[268px] divide-y divide-surface-border overflow-y-auto">
          {watchlist.map((company) => (
            <li key={company.companyId}>
              <Link
                href={`/companies/${company.companyId}`}
                className="flex items-center gap-12pxr py-12pxr transition-opacity hover:opacity-70">
                <div className="flex h-40pxr w-40pxr shrink-0 items-center justify-center overflow-hidden rounded-full border border-surface-border bg-surface-bg">
                  <CompanyLogo company={company} />
                </div>
                <p className="truncate text-[14px] font-bold text-text-primary">
                  {company.companyName ?? company.name ?? ''}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

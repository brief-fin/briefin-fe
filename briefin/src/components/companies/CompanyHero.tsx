'use client';

import { useState } from 'react';
import Image from 'next/image';

interface StatChip {
  label: string;
  value: string;
  unit?: string;
  isRise?: boolean;
  isFall?: boolean;
}

interface CompanyHeroProps {
  industry: string;
  name: string;
  logoUrl?: string;
  ticker?: string;
  stats: StatChip[];
  isWatchlisted?: boolean;
  onToggleWatchlist?: () => void;
}

export default function CompanyHero({ industry, name, logoUrl, ticker, stats, isWatchlisted = false, onToggleWatchlist }: CompanyHeroProps) {
  const [imgError, setImgError] = useState(false);
  const tossUrl = ticker
    ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${ticker}.png`
    : null;
  const resolvedLogoUrl = logoUrl || tossUrl;
  const hasLogo = !!resolvedLogoUrl && !imgError;

  return (
    <div
      className="rounded-hero px-24pxr py-16pxr md:px-56pxr md:py-36pxr"
      style={{ background: 'linear-gradient(135deg, #FDFBF7 0%, #EFF6FF 100%)' }}>

      <div className="flex items-start justify-between gap-16pxr">
        {/* 왼쪽: 로고 + 기업명 */}
        <div className="min-w-0">
          <div className="relative h-44pxr w-44pxr shrink-0 overflow-hidden rounded-full border border-surface-border bg-surface-white md:h-56pxr md:w-56pxr">
            {hasLogo ? (
              <Image
                src={resolvedLogoUrl!}
                alt={name}
                fill
                className="object-cover"
                unoptimized
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary to-primary-dark">
                <span className="text-[18px] font-black text-white md:text-[22px]">{name.charAt(0)}</span>
              </div>
            )}
          </div>
          <h1 className="mt-10pxr text-[22px] font-black tracking-[-0.5px] text-text-primary md:mt-14pxr md:text-[32px] md:tracking-[-1px]">
            {name}
          </h1>
          <p className="mt-4pxr text-[12px] font-bold text-primary-dark md:text-[14px]">{industry}</p>
        </div>

        {/* 오른쪽: 별 + 스탯 */}
        <div className="flex shrink-0 flex-col items-end gap-12pxr md:gap-16pxr">
          <button onClick={onToggleWatchlist} className="p-4pxr transition-transform hover:scale-110">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={isWatchlisted ? '#FBBF24' : 'none'}
              stroke={isWatchlisted ? '#FBBF24' : '#9CA3AF'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>

          <div className="flex flex-col gap-8pxr md:flex-row md:gap-12pxr">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-summary bg-surface-white px-12pxr py-10pxr shadow-stat-chip md:px-20pxr md:py-14pxr">
                <p className="fonts-micro text-center">{stat.label}</p>
                <p
                  className={`mt-4pxr text-center text-[14px] font-black tracking-[-0.5px] md:mt-8pxr md:text-[20px] ${
                    stat.isRise ? 'text-semantic-red' : stat.isFall ? 'text-semantic-neutral' : 'text-text-primary'
                  }`}>
                  {stat.value}
                  {stat.unit && <span className="ml-1pxr text-[10px] font-medium md:text-[13px]">{stat.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

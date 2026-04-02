'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { CompanyDetail } from '@/types/company';

interface CompanyCardProps {
  company: Pick<CompanyDetail, 'id' | 'name' | 'ticker' | 'logoUrl'> & { sector?: string };
  selected: boolean;
  onToggle: () => void;
}

function getTossLogoUrl(ticker: string) {
  return `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${ticker}.png`;
}

export default function CompanyCard({ company, selected, onToggle }: CompanyCardProps) {
  const { name, ticker, logoUrl } = company;
  const resolvedLogoUrl = logoUrl ?? (ticker ? getTossLogoUrl(ticker) : null);
  const [imgError, setImgError] = useState(false);
  const hasImageLogo = !!resolvedLogoUrl && !imgError;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group relative flex w-full cursor-pointer items-center rounded-xl border px-14pxr py-12pxr text-left transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-80pxr sm:min-h-0 sm:px-16pxr sm:py-0 ${
        selected
          ? 'border-primary ring-2 ring-primary'
          : 'border-surface-border bg-surface-white hover:shadow-news-hover'
      }`}
    >
      <div
        className={`flex size-44pxr shrink-0 items-center justify-center overflow-hidden ${
          hasImageLogo ? '' : 'bg-surface-muted rounded-xl'
        }`}
      >
        {hasImageLogo ? (
          <Image
            src={resolvedLogoUrl}
            alt={`${name} 로고`}
            width={32}
            height={32}
            className="h-9 w-9 object-contain"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-[18px]">🏢</span>
        )}
      </div>
      <div className="ml-12pxr min-w-0 flex-1">
        <p
          className={`truncate text-[14px] font-black leading-tight transition-colors sm:text-[15px] ${
            selected ? 'text-primary-dark' : 'text-text-primary group-hover:text-primary'
          }`}
        >
          {name}
        </p>
      </div>
    </button>
  );
}

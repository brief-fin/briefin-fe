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
      className={`group relative flex w-full cursor-pointer items-center rounded-xl border px-14pxr py-12pxr text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-0 sm:h-80pxr sm:px-16pxr sm:py-0 ${
        selected
          ? 'border-primary bg-primary-light ring-2 ring-primary'
          : 'border-surface-border bg-surface-white hover:border-primary/40 hover:bg-surface-bg'
      }`}
    >
      {selected && (
        <span className="absolute right-10pxr top-10pxr inline-flex h-22pxr items-center justify-center rounded-full bg-primary px-10pxr text-[12px] font-bold text-white">
          선택됨
        </span>
      )}
      <div
        className={`flex size-44pxr shrink-0 items-center justify-center overflow-hidden rounded-xl border border-surface-border ${
          hasImageLogo ? 'bg-white' : 'bg-surface-muted'
        }`}
      >
        {hasImageLogo ? (
          <Image
            src={resolvedLogoUrl}
            alt={`${name} 로고`}
            width={32}
            height={32}
            className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-[1.04]"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-[18px]">🏢</span>
        )}
      </div>
      <div className="ml-12pxr min-w-0 flex-1">
        <p
          className={`truncate text-[14px] font-black leading-tight sm:text-[15px] ${
            selected ? 'text-primary-dark' : 'text-text-primary'
          }`}
        >
          {name}
        </p>
        {ticker && (
          <p className="mt-4pxr text-[12px] font-bold text-text-muted">{ticker}</p>
        )}
      </div>
    </button>
  );
}

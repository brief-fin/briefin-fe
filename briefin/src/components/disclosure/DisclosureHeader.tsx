'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DisclosureHeaderProps } from '@/types/disclosure';
import { getCategoryLabel } from '@/constants/disclosureCategories';

function formatKoreanDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const parts = formatter.formatToParts(date);
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? '';

  return `${pick('year')}년 ${pick('month')}월 ${pick('day')}일 ${pick('hour')}:${pick('minute')}`;
}

function CompanyLogo({ ticker }: { ticker?: string }) {
  const [imgError, setImgError] = useState(false);
  const src =
    !imgError && ticker
      ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${ticker}.png`
      : null;

  if (src) {
    return (
      <Image
        src={src}
        alt={ticker ?? ''}
        width={40}
        height={40}
        className="rounded-full object-cover"
        unoptimized
        onError={() => setImgError(true)}
      />
    );
  }
  return <span className="text-[20px]">🏢</span>;
}

export default function DisclosureHeader({ data: { category, date, title, companyName, companyId, ticker } }: DisclosureHeaderProps) {
  return (
    <header className="space-y-12pxr">
      {/* 회사명 + ticker / category 배지 */}
      <div className="flex items-start justify-between gap-12pxr">
        <div className="flex min-w-0 items-center gap-10pxr">
          <CompanyLogo ticker={ticker} />
          {companyName && companyId ? (
            <Link href={`/companies/${companyId}`}>
              <p className="fonts-heading3 truncate font-bold text-text-primary cursor-pointer">{companyName}</p>
            </Link>
          ) : (
            companyName && <p className="fonts-heading3 truncate font-bold text-text-primary">{companyName}</p>
          )}
        </div>
        {category && (
          <span className="shrink-0 rounded-pill border border-primary px-12pxr py-4pxr text-[11px] font-semibold text-primary">
            {getCategoryLabel(category)}
          </span>
        )}
      </div>

      {/* 공시 제목 */}
      <h1 className="fonts-heading4 break-keep text-text-primary">{title}</h1>

      {/* 날짜 */}
      <p className="fonts-caption text-text-muted">{formatKoreanDate(date)}</p>
    </header>
  );
}

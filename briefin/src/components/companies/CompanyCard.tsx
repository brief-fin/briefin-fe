'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CompanyCardProps {
  id: number;
  name: string;
  sector: string | null;
  logoUrl: string | null;
  changeRate: number | null;
  currentPrice?: number | null;
}

interface LivePrice {
  currentPrice: number;
  changeRate: number;
}

export function CompanyCard({ company, livePrice }: { company: CompanyCardProps; livePrice?: LivePrice }) {
  const changeRate = livePrice?.changeRate ?? company.changeRate;
  const currentPrice = livePrice?.currentPrice ?? company.currentPrice;
  const isPositive = (changeRate ?? 0) >= 0;
  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/companies/${company.id}`)}
      className="flex cursor-pointer items-center gap-12pxr py-12pxr hover:opacity-70">
      <div className="flex h-40pxr w-40pxr shrink-0 items-center justify-center rounded-button bg-primary-light overflow-hidden">
        {company.logoUrl ? (
          <Image src={company.logoUrl} alt={company.name} width={40} height={40} />
        ) : (
          <span className="text-18pxr">🏢</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-bold text-text-primary">{company.name}</p>
        <p className="fonts-caption">{company.sector ?? '업종 미분류'}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`text-[13px] font-bold ${isPositive ? 'text-semantic-red' : 'text-semantic-blue'}`}>
          {changeRate != null ? `${isPositive ? '+' : ''}${changeRate}%` : '-'}
        </p>
        {currentPrice != null && (
          <p className="fonts-caption text-text-muted">{currentPrice.toLocaleString()}원</p>
        )}
      </div>
    </li>
  );
}
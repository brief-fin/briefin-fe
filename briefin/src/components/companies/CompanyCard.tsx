'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CompanyCardProps {
  id: number;
  name: string;
  sector: string | null;
  logoUrl: string | null;
  changeRate: number | null;
}

export function CompanyCard({ company }: { company: CompanyCardProps }) {
  const isPositive = (company.changeRate ?? 0) >= 0;
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const logoSrc = !imgError && company.logoUrl ? company.logoUrl : '/default-company.png';

  return (
    <div
      onClick={() => router.push(`/companies/${company.id}`)}
      className="flex cursor-pointer items-center gap-16pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr transition-shadow hover:shadow-news-hover">
      <div className="flex h-48pxr w-48pxr flex-shrink-0 items-center justify-center rounded-nav bg-primary-light overflow-hidden">
        <Image
          src={logoSrc}
          alt={company.name}
          width={48}
          height={48}
          onError={() => setImgError(true)}
        />
      </div>
      <div className="flex flex-col gap-4pxr">
        <div className="fonts-cardTitle">{company.name}</div>
        <div className="fonts-caption">{company.sector ?? '업종 미분류'}</div>
        <div className={`fonts-subTitle ${isPositive ? 'text-semantic-red' : 'text-semantic-blue'}`}>
          {company.changeRate != null
            ? `${isPositive ? '+' : ''}${company.changeRate}%`
            : '-'}
        </div>
      </div>
    </div>
  );
}
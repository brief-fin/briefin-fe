'use client';

import { Company } from '@/mocks/mockCompanyData';
import { useRouter } from 'next/navigation';

export function CompanyCard({ company }: { company: Company }) {
  const isPositive = company.changeRate >= 0;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/companies/${company.id}`)}
      className="flex cursor-pointer items-center gap-16pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr transition-shadow hover:shadow-news-hover">
      <div className="text-24pxr flex h-48pxr w-48pxr flex-shrink-0 items-center justify-center rounded-nav bg-primary-light">
        {company.emoji}
      </div>
      <div className="flex flex-col gap-4pxr">
        <div className="fonts-cardTitle">{company.name}</div>
        <div className="fonts-caption">{company.category}</div>
        <div className={`fonts-subTitle ${isPositive ? 'text-semantic-red' : 'text-semantic-blue'}`}>
          {isPositive ? '+' : ''}
          {company.changeRate}%
        </div>
      </div>
    </div>
  );
}

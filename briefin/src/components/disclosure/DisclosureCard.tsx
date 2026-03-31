'use client';

import Link from 'next/link';
import Label from '@/components/common/Label';
import { DisclosureCardProps } from '@/types/disclosure';
import { getCategoryLabel } from '@/constants/disclosureCategories';


export default function DisclosureCard({ item, sourceLabel = 'DART 공시' }: DisclosureCardProps) {
  const { title, date, category, companyName, summaryPoints, sentiment } = item;

  return (
    <Link
      href={`/disclosure/${item.id}`}
      className="group flex w-full cursor-pointer flex-col gap-14pxr rounded-card border border-surface-border bg-white px-25pxr py-28pxr">
      {/* 회사명 + 공시 유형 태그 / 출처 + 날짜 */}
      <div className="flex items-center justify-between gap-8pxr">
        <section className="flex flex-wrap gap-6pxr">
          {companyName && <Label text={companyName} variant="company" />}
          {category && <Label text={getCategoryLabel(category)} variant="category" />}
        </section>
        <p className="fonts-label shrink-0 text-text-muted">
          {sourceLabel} {date}
        </p>
      </div>

      {/* 제목 */}
      <p className="fonts-cardTitle line-clamp-2 text-text-primary transition-colors group-hover:text-primary">{title}</p>

      {/* 요약 */}
      {summaryPoints && summaryPoints.length > 0 && (
        <section className="overflow-hidden rounded-summary border border-text-divider">
          {summaryPoints.map((point, idx) => (
            <div key={idx} className={`flex items-start gap-12pxr px-16pxr py-11pxr ${idx > 0 ? 'border-t border-text-divider' : ''}`}>
              <span className="fonts-label w-16pxr shrink-0 font-bold text-text-muted">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="fonts-label line-clamp-1 text-text-secondary">{point}</p>
            </div>
          ))}
        </section>
      )}


    </Link>
  );
}

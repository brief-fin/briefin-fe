'use client';

import Link from 'next/link';
import Label from '@/components/common/Label';
import { DisclosureCardProps } from '@/types/disclosure';
import { getCategoryLabel } from '@/constants/disclosureCategories';

const SENTIMENT_STYLES = {
  호재: 'bg-emerald-50 text-emerald-800',
  악재: 'bg-red-100 text-red-800',
  중립: 'bg-gray-200 text-gray-700',
} as const;

export default function DisclosureCard({ item, sourceLabel = 'DART 공시' }: DisclosureCardProps) {
  const { title, date, category, companyName, summaryPoints, sentiment } = item;

  const hasLabels = category || companyName;

  return (
    <Link
      href={`/disclosure/${item.id}`}
      className="flex w-full cursor-pointer flex-col gap-14pxr rounded-card border border-surface-border bg-white px-25pxr py-28pxr">
      {/* 출처 + 날짜 */}
      <p className="fonts-label flex items-center gap-6pxr text-text-muted">
        <span>{sourceLabel}</span>
        <span>{date}</span>
      </p>

      {/* 제목 + 감성 태그 */}
      <div className="flex items-start gap-8pxr">
        <p className="fonts-cardTitle line-clamp-2 flex-1 text-text-primary">{title}</p>
        {sentiment && (
          <span className={`fonts-label mt-2pxr shrink-0 rounded-badge px-8pxr py-2pxr font-semibold ${SENTIMENT_STYLES[sentiment]}`}>
            {sentiment}
          </span>
        )}
      </div>

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

      {/* 태그: 공시 유형 + 회사 */}
      {hasLabels && (
        <section className="flex flex-wrap gap-6pxr">
          {companyName && <Label key="company" text={companyName} variant="company" />}
          {category && <Label key="category" text={getCategoryLabel(category)} variant="category" />}
        </section>
      )}
    </Link>
  );
}

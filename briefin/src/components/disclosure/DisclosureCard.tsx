'use client';

import Link from 'next/link';
import { CheckIcon } from '../../../public/icon';
import Label from '@/components/common/Label';
import { DisclosureCardProps } from '@/types/disclosure';

export default function DisclosureCard({ item, sourceLabel = 'DART 공시' }: DisclosureCardProps) {
  const { title, date, category, companyName, summaryPoints } = item;
  const hasLabels = category || companyName;

  return (
    <Link
      href={`/disclosure/${item.id}`}
      className="flex max-w-1028pxr cursor-pointer flex-col gap-14pxr rounded-card border border-surface-border bg-white px-25pxr py-28pxr last:border-b-0">
      {/* 출처 + 날짜 */}
      <p className="fonts-label flex items-center gap-6pxr text-text-muted">
        <span>{sourceLabel}</span>
        <span>{date}</span>
      </p>

      {/* 제목 */}
      <p className="fonts-cardTitle text-text-primary">{title}</p>

      {/* 요약 */}
      {summaryPoints && summaryPoints.length > 0 && (
        <section className="flex flex-col gap-8pxr rounded-summary bg-primary-light px-18pxr py-14pxr">
          {summaryPoints.map((point, idx) => (
            <div key={idx} className="flex items-center gap-6pxr">
              <CheckIcon className="shrink-0" />
              <p className="fonts-label text-primary">{point}</p>
            </div>
          ))}
        </section>
      )}

      {/* 태그: 공시 유형 + 회사 */}
      {hasLabels && (
        <section className="flex flex-wrap gap-6pxr">
          {category && <Label key="category" text={category} variant="category" />}
          {companyName && <Label key="company" text={companyName} variant="company" />}
        </section>
      )}
    </Link>
  );
}

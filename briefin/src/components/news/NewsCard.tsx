'use client';

import Image from 'next/image';
import Link from 'next/link';
import Label from '../common/Label';
import { NewsCardProps } from '@/types/news';

export default function NewsCard({ news }: NewsCardProps) {
  const { id, source, time, title, summary, categories, companies, thumbnailUrl } = news;

  const hasLabels = categories.length > 0 || companies.length > 0;

  return (
    <Link
      href={`/news/${id}`}
      className="group flex max-w-1028pxr gap-20pxr rounded-card border border-surface-border bg-white px-24pxr py-22pxr transition-shadow hover:shadow-news-hover">

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col gap-10pxr overflow-hidden">

        {/* 태그: 상단 */}
        {hasLabels && (
          <section className="flex flex-wrap gap-6pxr">
            {categories.map((cat) => (
              <Label key={cat} text={cat} variant="category" />
            ))}
            {companies.map((company) => (
              <Label key={company} text={company} variant="company" />
            ))}
          </section>
        )}

        {/* 제목 */}
        <p className="fonts-cardTitle line-clamp-2 text-text-primary transition-colors group-hover:text-primary">
          {title}
        </p>

        {/* 요약: 심플 불릿 */}
        {summary && summary.length > 0 && (
          <ul className="flex flex-col gap-4pxr">
            {summary.slice(0, 2).map((item, idx) => (
              <li key={idx} className="fonts-label flex items-start gap-6pxr text-text-secondary">
                <span className="mt-2pxr shrink-0 text-primary">•</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* 언론사 + 시간: 하단 바이라인 */}
        <p className="fonts-label mt-auto flex items-center gap-4pxr pt-4pxr text-text-muted">
          <span className="font-medium text-text-sub">{source}</span>
          <span>·</span>
          <span>{time}</span>
        </p>
      </div>

      {/* 썸네일: 와이드형, 상단 정렬 */}
      {thumbnailUrl && (
        <div className="relative h-100pxr w-160pxr shrink-0 self-start overflow-hidden rounded-md">
          <Image src={thumbnailUrl} alt="" fill className="object-cover" />
        </div>
      )}
    </Link>
  );
}

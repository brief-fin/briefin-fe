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
      className="group flex max-w-1028pxr flex-col gap-10pxr rounded-card border border-surface-border bg-white px-24pxr py-22pxr transition-shadow hover:shadow-news-hover sm:flex-row sm:gap-20pxr">

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col gap-10pxr overflow-hidden">

        {/* 태그: 데스크탑만 */}
        {hasLabels && (
          <section className="hidden flex-wrap gap-6pxr sm:flex">
            {categories.map((cat) => (
              <Label key={cat} text={cat} variant="category" />
            ))}
            {companies.map((company) => (
              <Label key={company} text={company} variant="company" />
            ))}
          </section>
        )}

        {/* 모바일: 썸네일 + 제목 한 줄 / 데스크탑: 제목만 */}
        <div className="flex items-start gap-12pxr sm:block">
          {thumbnailUrl && (
            <div className="relative h-72pxr w-100pxr shrink-0 overflow-hidden rounded-md sm:hidden">
              <Image src={thumbnailUrl} alt="" fill className="object-cover" />
            </div>
          )}
          <p className="fonts-cardTitle line-clamp-2 flex-1 text-text-primary transition-colors group-hover:text-primary">
            {title}
          </p>
        </div>

        {/* 요약: 심플 불릿 */}
        {summary && summary.length > 0 && (
          <ul className="flex flex-col gap-4pxr">
            {summary.slice(0, 2).map((item, idx) => (
              <li key={idx} className="fonts-label flex items-center gap-6pxr text-text-secondary">
                <span className="shrink-0 text-primary">•</span>
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

      {/* 썸네일: 데스크탑만 */}
      {thumbnailUrl && (
        <div className="relative hidden h-100pxr w-160pxr shrink-0 self-center overflow-hidden rounded-md sm:block">
          <Image src={thumbnailUrl} alt="" fill className="object-cover" />
        </div>
      )}
    </Link>
  );
}

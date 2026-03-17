'use client';

import { CheckIcon } from '../../../public/icon';
import Label from './Label';
import { NewsItem } from '@/types/news';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const { source, time, isLive, title, summary, categories, companies } = news;

  const hasLabels = categories.length > 0 || companies.length > 0;

  return (
    <div className="max-w-1028pxr flex flex-col gap-14pxr rounded-card border border-surface-border bg-white px-25pxr py-28pxr last:border-b-0">
      {/* 언론사 + 시간 */}
      <p className="fonts-label flex items-center gap-6pxr text-text-muted">
        {isLive && (
          <span className="fonts-label rounded-badge bg-[#FFF1F1] px-6pxr py-1pxr text-semantic-red">● LIVE</span>
        )}
        <span>{source}</span>
        <span>{time}</span>
      </p>

      {/* 제목 */}
      <p className="fonts-cardTitle text-text-primary">{title}</p>

      {/* 요약 */}
      {summary && summary.length > 0 && (
        <section className="flex flex-col gap-8pxr rounded-summary bg-primary-light px-18pxr py-14pxr">
          {summary.map((item, idx) => (
            <div key={idx} className="flex items-center gap-6pxr">
              <CheckIcon className="shrink-0" />
              <p className="fonts-label text-primary">{item}</p>
            </div>
          ))}
        </section>
      )}

      {/* 태그 */}
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
    </div>
  );
}

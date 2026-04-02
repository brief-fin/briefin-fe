import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FeedItem } from '@/api/feedApi';

export default function FeedGridCard({ item, logoUrl }: { item: FeedItem; logoUrl?: string | null }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <Link
      href={`/news/${item.newsId}`}
      className="group flex flex-col overflow-hidden rounded-card border border-surface-border bg-surface-white transition-shadow hover:shadow-news-hover">
      {/* 썸네일 */}
      <div className="relative h-[140px] w-full overflow-hidden bg-surface-muted sm:h-[160px]">
        {item.thumbnailUrl ? (
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : logoUrl && !logoError ? (
          <div className="flex h-full items-center justify-center bg-surface-bg">
            <Image
              src={logoUrl}
              alt={item.relatedCompanies?.[0] ?? ''}
              width={60}
              height={60}
              className="rounded-full object-cover"
              unoptimized
              onError={() => setLogoError(true)}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-light to-surface-bg" />
        )}
        {item.category && (
          <span className="absolute left-10pxr top-10pxr rounded-badge bg-black/60 px-8pxr py-3pxr text-[11px] font-bold text-white">
            {item.category}
          </span>
        )}
      </div>

      {/* 텍스트 */}
      <div className="flex flex-1 flex-col gap-8pxr p-16pxr">
        <p className="line-clamp-2 text-[14px] font-bold leading-snug text-text-primary transition-colors group-hover:text-primary">
          {item.title}
        </p>
        {(item.relatedCompanies ?? []).length > 0 && (
          <p className="line-clamp-1 text-[12px] text-primary font-medium">
            {item.relatedCompanies.join(' · ')}
          </p>
        )}
        <p className="mt-auto text-[11px] text-text-muted">
          <span className="font-medium text-text-sub">{item.press}</span>
          <span className="mx-4pxr">·</span>
          <span>{item.publishedAt}</span>
        </p>
      </div>
    </Link>
  );
}

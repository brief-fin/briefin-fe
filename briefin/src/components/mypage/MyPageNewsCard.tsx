'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MyPageNewsCardProps {
  newsId: number;
  title: string;
  summary?: string;
  source: string;
  date: string;
  thumbnailUrl?: string | null;
  topLeftSlot?: React.ReactNode;
}

export default function MyPageNewsCard({
  newsId,
  title,
  summary,
  source,
  date,
  thumbnailUrl,
  topLeftSlot,
}: MyPageNewsCardProps) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const showThumb = !!thumbnailUrl && !imgError;

  return (
    <div className="rounded-card border border-surface-border bg-surface-white">
      {/* 메인 행 */}
      <div className="flex items-center gap-12pxr px-20pxr py-16pxr">
        {/* 왼쪽: 스크랩 아이콘(상단) + 제목/출처 */}
        <div className="flex min-w-0 flex-1 flex-col">
          {topLeftSlot && <div className="mb-6pxr self-start">{topLeftSlot}</div>}
          <Link href={`/news/${newsId}`} className="group min-w-0">
            <p className="text-[17px] font-bold leading-snug text-text-primary transition-colors group-hover:text-primary-dark">
              {title}
            </p>
            <p className="fonts-caption mt-6pxr text-text-disabled">
              {source} · {date}
            </p>
          </Link>
        </div>

        {/* 오른쪽: 썸네일 (세로 중앙) */}
        {showThumb && (
          <div className="h-80pxr w-112pxr shrink-0 overflow-hidden rounded-md">
            <Image
              src={thumbnailUrl!}
              alt={title}
              width={112}
              height={80}
              className="h-full w-full object-cover"
              unoptimized
              onError={() => setImgError(true)}
            />
          </div>
        )}
      </div>

      {/* 구분선 + 접기/펼치기 */}
      {summary && (
        <>
          <div className="mx-20pxr border-t border-surface-border" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-center py-8pxr text-orange-400 transition-colors hover:text-orange-500">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <p className="px-20pxr pb-16pxr text-[13px] leading-relaxed text-text-secondary">
              {summary}
            </p>
          )}
        </>
      )}
    </div>
  );
}

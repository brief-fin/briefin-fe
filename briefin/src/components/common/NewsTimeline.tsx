'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NewsTimelineProps } from '@/types/timeline';

const PAGE_SIZE = 10;

export default function NewsTimeline({ items, loading, title = '뉴스 히스토리' }: NewsTimelineProps) {
  const [expanded, setExpanded] = useState(false);

  const sorted = [...items].sort((a, b) => {
    const ka = a.publishedAt ?? a.date ?? '';
    const kb = b.publishedAt ?? b.date ?? '';
    return kb.localeCompare(ka);
  });

  const visible = expanded ? sorted : sorted.slice(0, PAGE_SIZE);
  const hasMore = sorted.length > PAGE_SIZE;

  return (
    <div className="rounded-card border border-[#E5E7EB] bg-surface-white">
      {/* Header */}
      <div className="px-20pxr pt-16pxr">
        <p className="text-[15px] font-bold text-text-primary">{title}</p>
      </div>

      {/* Timeline */}
      <div className="mt-12pxr border-t border-[#E5E7EB] px-20pxr py-16pxr">
        {loading ? (
          <TimelineSkeleton />
        ) : sorted.length === 0 ? (
          <p className="py-12pxr text-center text-[12px] text-text-muted">관련 뉴스가 없습니다.</p>
        ) : (
          <>
            <div className="flex flex-col">
              {visible.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === visible.length - 1 && !hasMore;
                const rowKey = item.newsId ?? `${item.date}-${idx}`;

                const inner = (
                  <div className="flex items-start">
                    {/* Date */}
                    <div className="w-70pxr shrink-0 pr-12pxr pt-3pxr text-right">
                      <span className="text-[11px] font-medium text-text-muted">{item.date}</span>
                    </div>

                    {/* Dot + line */}
                    <div className="flex shrink-0 flex-col items-center" style={{ width: 14 }}>
                      <div
                        className={[
                          'mt-5pxr rounded-full',
                          isFirst ? 'h-8pxr w-8pxr bg-primary' : 'h-6pxr w-6pxr bg-[#D1D5DB]',
                        ].join(' ')}
                      />
                      {!isLast && <div className="mt-4pxr w-[1.5px] flex-1 bg-[#E5E7EB]" style={{ minHeight: 28 }} />}
                    </div>

                    {/* Content */}
                    <div className={['flex flex-1 flex-col gap-4pxr pl-10pxr', isLast ? '' : 'pb-16pxr'].join(' ')}>
                      {isFirst && (
                        <span className="inline-block self-start rounded-badge bg-primary px-7pxr py-2pxr text-[10px] font-bold text-white">
                          최신
                        </span>
                      )}
                      <p className="leading-18pxr text-[12px] font-bold text-primary">{item.title}</p>
                      <p className="text-[10px] font-medium text-text-muted">{item.source}</p>
                    </div>
                  </div>
                );

                return item.newsId ? (
                  <Link key={rowKey} href={`/news/${item.newsId}`} className="group">
                    {inner}
                  </Link>
                ) : (
                  <div key={rowKey}>{inner}</div>
                );
              })}
            </div>

            {hasMore && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-8pxr w-full rounded-lg py-8pxr text-[12px] font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary">
                {expanded ? '접기' : `더보기 (${sorted.length - PAGE_SIZE}개)`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="flex flex-col gap-16pxr">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-start gap-8pxr">
          <div className="h-11pxr w-58pxr animate-pulse rounded bg-[#E5E7EB]" />
          <div className="h-8pxr w-8pxr animate-pulse rounded-full bg-[#E5E7EB]" />
          <div className="flex flex-1 flex-col gap-6pxr">
            <div className="h-10pxr w-1/3 animate-pulse rounded bg-[#E5E7EB]" />
            <div className="h-28pxr w-full animate-pulse rounded bg-[#E5E7EB]" />
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { NewsTimelineProps } from '@/types/timeline';

export default function NewsTimeline({ tags, activeTag, onTagChange, items, loading }: NewsTimelineProps) {
  const filtered = items.filter((item) => item.tag === activeTag);

  return (
    <div className="rounded-card border border-[#E5E7EB] bg-surface-white">
      {/* Header */}
      <div className="px-20pxr pt-16pxr">
        <p className="text-[15px] font-bold text-text-primary">🗂 뉴스 히스토리</p>
      </div>

      {/*
        태그 잘림 방지: overflow-x 컨테이너가 overflow-y도 암묵적으로 clip하므로
        outer div에 py 여유를 두고 inner에서 실제 overflow-x를 처리
      */}
      <div className="mt-12pxr px-20pxr py-4pxr">
        <div className="flex gap-8pxr overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tags.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagChange(tag)}
                className={[
                  'shrink-0 rounded-pill border px-12pxr py-6pxr text-[12px] font-bold transition-colors',
                  isActive ? 'border-primary bg-primary text-white' : 'border-[#E5E7EB] bg-[#F9FAFB] text-text-sub',
                ].join(' ')}>
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-[#E5E7EB] px-20pxr py-16pxr">
        {loading ? (
          <TimelineSkeleton />
        ) : filtered.length === 0 ? (
          <p className="py-12pxr text-center text-[12px] text-text-muted">관련 뉴스가 없습니다.</p>
        ) : (
          <div className="flex flex-col">
            {filtered.map((item, idx) => {
              const isLast = idx === filtered.length - 1;
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
                        item.isLatest ? 'h-8pxr w-8pxr bg-primary' : 'h-6pxr w-6pxr bg-[#D1D5DB]',
                      ].join(' ')}
                    />
                    {!isLast && <div className="mt-4pxr w-[1.5px] flex-1 bg-[#E5E7EB]" style={{ minHeight: 28 }} />}
                  </div>

                  {/* Content */}
                  <div className={['flex flex-1 flex-col gap-4pxr pl-10pxr', isLast ? '' : 'pb-16pxr'].join(' ')}>
                    {item.isLatest && (
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

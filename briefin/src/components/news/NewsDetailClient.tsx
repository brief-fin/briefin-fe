'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NewsDetailResponse } from '@/api/newsApi';
import NewsHeader from '@/components/news/NewsHeader';
import NewsSummary from '@/components/news/NewsSummary';
import NewsDetail from '@/components/news/NewsDetail';
import NewsSidebar from '@/components/news/NewsSidebar';
import NewsTimeline from '@/components/common/NewsTimeline';
import NewsRelatedCompanies from '@/components/news/NewsRelatedCompanies';
import NewsActions from '@/components/news/NewsActions';
import { TIMELINE_TAGS, MOCK_TIMELINE_ITEMS } from '@/mocks/timelineData';

export default function NewsDetailClient({ data }: { data: NewsDetailResponse }) {
  const [activeTimelineTag, setActiveTimelineTag] = useState(TIMELINE_TAGS[0]);

  // 백엔드 데이터 → 컴포넌트 형식으로 변환
  const relatedCompanies = (data.relatedCompanies ?? []).map((name, i) => ({
    id: String(i),
    name,
    emoji: '🏢',
  }));

  const relatedNews = (data.relatedNews ?? []).map((newsId, i) => ({
    id: String(newsId),
    title: `관련 뉴스 ${i + 1}`,
    source: '',
    publishedAt: '',
  }));

  return (
    <div className="min-h-screen bg-surface-bg pb-40pxr">
      <div className="pt-20pxr sm:pt-28pxr md:pt-36pxr">
        <Link
          href="/news"
          className="inline-flex items-center gap-4pxr rounded-button border border-surface-border bg-surface-white px-12pxr py-8pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg sm:px-14pxr sm:py-10pxr sm:text-[14px]">
          ← 뉴스 목록으로
        </Link>
      </div>

      <div className="mt-14pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <article className="min-w-0 flex-1 rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
          <NewsHeader
            data={{
              category: data.category,
              publishedAt: data.publishedAt,
              source: data.press,
              title: data.title,
              isLive: false,
            }}
          />

          <div className="mt-20pxr">
            <NewsSummary summaries={data.summary ? data.summary.split('\n').filter(Boolean) : []} />
          </div>

          <NewsDetail content={data.content} />

          <NewsActions originalUrl="" isScrapped={false} />
          <NewsRelatedCompanies relatedCompanies={relatedCompanies} />
        </article>

        <div className="flex w-full flex-col gap-16pxr lg:w-[320px] lg:shrink-0">
          <NewsSidebar relatedNews={relatedNews} relatedCompanies={relatedCompanies} />
          <NewsTimeline
            tags={TIMELINE_TAGS}
            activeTag={activeTimelineTag}
            onTagChange={setActiveTimelineTag}
            items={MOCK_TIMELINE_ITEMS}
          />
        </div>
      </div>
    </div>
  );
}

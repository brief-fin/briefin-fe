'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import type { NewsDetailResponse } from '@/api/newsApi';
import { scrapNews, deleteScrapNews, fetchRelatedNews, fetchNewsTerms } from '@/api/newsApi';
import NewsHeader from '@/components/news/NewsHeader';
import NewsSummary from '@/components/news/NewsSummary';
import NewsDetail from '@/components/news/NewsDetail';
import NewsSidebar from '@/components/news/NewsSidebar';
import NewsTimeline from '@/components/common/NewsTimeline';
import NewsRelatedCompanies from '@/components/news/NewsRelatedCompanies';
import NewsActions from '@/components/news/NewsActions';
import { useNewsTimeline } from '@/hooks/useNews';
import type { NewsTimelineItem } from '@/types/timeline';

export default function NewsDetailClient({ data }: { data: NewsDetailResponse }) {
  const [activeTimelineTag, setActiveTimelineTag] = useState('');
  const [isScrapped, setIsScrapped] = useState(data.isScraped ?? false);

  const scrapMutation = useMutation({
    mutationFn: () => scrapNews(data.newsId),
    onSuccess: () => setIsScrapped(true),
  });

  const unscrapMutation = useMutation({
    mutationFn: () => deleteScrapNews(data.newsId),
    onSuccess: () => setIsScrapped(false),
  });

  const handleToggleScrap = () => {
    if (isScrapped) {
      unscrapMutation.mutate();
    } else {
      scrapMutation.mutate();
    }
  };

  const { data: relatedNewsData } = useQuery({
    queryKey: ['news', data.newsId, 'related'],
    queryFn: () => fetchRelatedNews(data.newsId),
  });

  const { data: termsData } = useQuery({
    queryKey: ['news', data.newsId, 'terms'],
    queryFn: () => fetchNewsTerms(data.newsId),
  });

  const { data: timelineData, isLoading: timelineLoading } = useNewsTimeline(data.newsId);

  const timelineItems: NewsTimelineItem[] = (timelineData ?? []).map((item) => ({
    id: item.newsId,
    date: item.publishedAt ? item.publishedAt.slice(0, 10).replace(/-/g, '.') : '',
    title: item.title,
    source: item.press,
    tag: item.category ?? '기타',
    isLatest: item.isCurrent,
    newsId: item.newsId,
  }));

  const timelineTags = [...new Set(timelineItems.map((i) => i.tag))];
  const effectiveTag = timelineTags.includes(activeTimelineTag) ? activeTimelineTag : (timelineTags[0] ?? '');

  const relatedCompanies = (data.relatedCompanies ?? []).map((company) => ({
    id: company.companyId,
    name: company.name,
    ticker: company.ticker ?? null,
    logoUrl: company.logoUrl ?? null,
  }));

  const relatedNews = (relatedNewsData ?? []).map((item) => ({
    id: item.newsId,
    title: item.title,
    source: item.press,
    publishedAt: item.publishedAt,
  }));

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <article className="min-w-0 flex-1 rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
          <NewsHeader
            data={{
              category: data.category,
              publishedAt: data.publishedAt,
              source: data.press,
              title: data.title,
              isLive: false,
            }}
            isScrapped={isScrapped}
            onToggleScrap={handleToggleScrap}
          />

          <div className="mt-20pxr">
            <NewsSummary summaries={data.summary ? data.summary.split('\n').filter(Boolean) : []} terms={termsData ?? []} />
          </div>

          {data.thumbnailUrl && (
            <div className="rounded-8pxr mt-20pxr overflow-hidden">
              <Image
                src={data.thumbnailUrl}
                alt={data.title}
                width={800}
                height={600}
                className="h-auto max-h-500pxr w-full object-contain"
                unoptimized
                priority
              />
              <p className="text-text-disabled mt-6pxr text-right text-[12px]">{data.press}</p>
            </div>
          )}

          <NewsDetail content={data.content} terms={termsData ?? []} />

          <NewsActions originalUrl={data.originalUrl ?? null} />
          <NewsRelatedCompanies relatedCompanies={relatedCompanies} />
        </article>

        <div className="flex w-full flex-col gap-16pxr lg:w-[320px] lg:shrink-0">
          <NewsTimeline
            tags={timelineTags}
            activeTag={effectiveTag}
            onTagChange={setActiveTimelineTag}
            items={timelineItems}
            loading={timelineLoading}
          />
          <NewsSidebar relatedNews={relatedNews} relatedCompanies={relatedCompanies} />
        </div>
      </div>
    </div>
  );
}

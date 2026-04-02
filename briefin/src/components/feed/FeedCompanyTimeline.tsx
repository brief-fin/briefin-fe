'use client';

import { useEffect, useState } from 'react';
import NewsTimeline from '@/components/common/NewsTimeline';
import { fetchCompanyTimeline } from '@/api/companyApi';
import type { NewsTimelineItem } from '@/types/timeline';
import type { WatchlistCompany } from '@/types/mypage';

interface Props {
  companies: WatchlistCompany[];
}

export default function FeedCompanyTimeline({ companies }: Props) {
  const [items, setItems] = useState<NewsTimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const companiesKey = companies.map((c) => c.companyId).join(',');

  useEffect(() => {
    if (companies.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(companies.map((c) => fetchCompanyTimeline(c.companyId)))
      .then((results) => {
        const merged: NewsTimelineItem[] = results.flatMap((timelineItems, idx) => {
          const company = companies[idx];
          return timelineItems.map((item) => ({
            id: `${company.companyId}-${item.id}`,
            date: item.date ? item.date.replace(/-/g, '.') : '',
            title: item.title,
            source: company.companyName,
            tag: item.category ?? item.type,
            newsId: item.type === '뉴스' ? item.id : undefined,
            publishedAt: item.date ?? '',
          }));
        });
        setItems(merged);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesKey]);

  return <NewsTimeline items={items} loading={loading} title="관심 기업 타임라인" />;
}

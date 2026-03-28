'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import DisclosureCard from '@/components/disclosure/DisclosureCard';
import { fetchDisclosureList } from '@/api/disclosureApi';
import type { DisclosureApiItem } from '@/types/disclosure';

interface Props {
  initialItems: DisclosureCardItem[];
  initialPage: number;
  totalPages: number;
  companyId?: number;
}

interface DisclosureCardItem {
  id: string;
  title: string;
  date: string;
  category: string;
  companyName: string;
  summaryPoints: string[];
}

function toCardItem(item: DisclosureApiItem): DisclosureCardItem {
  return {
    id: String(item.disclosureId),
    title: item.title,
    date: item.disclosedAt,
    category: item.companyName ?? '',
    companyName: item.companyName,
    summaryPoints: item.summary ? item.summary.split('\n').filter(Boolean) : [],
  };
}

export default function DisclosureInfiniteList({ initialItems, initialPage, totalPages, companyId }: Props) {
  const [items, setItems] = useState<DisclosureCardItem[]>(initialItems);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < totalPages - 1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchDisclosureList({ companyId, page: nextPage, size: 20 });
      setItems((prev) => [...prev, ...data.content.map(toCardItem)]);
      setPage(nextPage);
      setHasMore(nextPage < data.totalPages - 1);
    } catch {
      // 에러 시 무한스크롤 중단
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, companyId]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="flex flex-col gap-14pxr">
      {items.map((item) => (
        <DisclosureCard key={item.id} item={item} />
      ))}

      {/* sentinel: 이 div가 뷰포트에 진입하면 다음 페이지 로드 */}
      <div ref={sentinelRef} className="h-1" />

      {isLoading && (
        <div className="flex justify-center py-8">
          <span className="text-sm text-text-secondary">불러오는 중...</span>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <p className="py-8 text-center text-sm text-text-secondary">모든 공시를 불러왔습니다.</p>
      )}
    </div>
  );
}

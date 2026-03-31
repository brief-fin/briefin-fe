'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import DisclosureCard from '@/components/disclosure/DisclosureCard';
import DisclosureCardSkeleton from '@/components/disclosure/DisclosureCardSkeleton';
import { fetchDisclosureList } from '@/api/disclosureApi';
import type { DisclosureApiItem, DisclosureInfiniteListProps, DisclosureListItem } from '@/types/disclosure';

function toCardItem(item: DisclosureApiItem): DisclosureListItem {
  return {
    id: String(item.disclosureId),
    title: item.title,
    date: item.disclosedAt,
    category: item.category ?? '',
    companyName: item.companyName,
    summaryPoints: item.keyPoints ?? [],
    sentiment: item.sentiment,
  };
}

export default function DisclosureInfiniteList({ initialItems, initialPage, totalPages, companyId }: DisclosureInfiniteListProps) {
  const [items, setItems] = useState<DisclosureListItem[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);
  const pageRef = useRef(initialPage);
  const hasMoreRef = useRef(initialPage < totalPages - 1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMoreRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    try {
      const nextPage = pageRef.current + 1;
      const data = await fetchDisclosureList({ companyId, page: nextPage, size: 10 });
      pageRef.current = nextPage;
      hasMoreRef.current = nextPage < data.totalPages - 1;
      setItems((prev) => {
        const existingIds = new Set(prev.map((i) => i.id));
        const newItems = data.content.map(toCardItem).filter((i) => !existingIds.has(i.id));
        return [...prev, ...newItems];
      });
    } catch {
      hasMoreRef.current = false;
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [companyId]);

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
    <div className="grid grid-cols-1 gap-14pxr md:grid-cols-2">
      {items.map((item) => (
        <DisclosureCard key={item.id} item={item} />
      ))}

      {/* sentinel: 이 div가 뷰포트에 진입하면 다음 페이지 로드 */}
      <div ref={sentinelRef} className="col-span-1 h-1 md:col-span-2" />

      {isLoading && (
        <>
          <DisclosureCardSkeleton />
          <DisclosureCardSkeleton />
          <DisclosureCardSkeleton />
          <DisclosureCardSkeleton />
        </>
      )}
    </div>
  );
}

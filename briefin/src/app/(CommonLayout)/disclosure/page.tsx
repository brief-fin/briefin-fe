import DisclosureInfiniteList from '@/components/disclosure/DisclosureInfiniteList';
import DisclosureAlertFab from '@/components/disclosure/DisclosureAlertFab';
import { fetchDisclosureList } from '@/api/disclosureApi';
import type { DisclosureApiItem, DisclosureListItem } from '@/types/disclosure';

export default async function DisclosurePage() {
  let initialItems: DisclosureListItem[] = [];
  let totalPages = 1;

  try {
    const data = await fetchDisclosureList({ page: 0, size: 10 });
    initialItems = data.content.map((item: DisclosureApiItem) => ({
      id: String(item.disclosureId),
      title: item.title,
      date: item.disclosedAt,
      category: item.category ?? '',
      companyName: item.companyName,
      summaryPoints: item.keyPoints ?? [],
      sentiment: item.sentiment,
    }));
    totalPages = data.totalPages;
  } catch {
    // fallback: empty list
  }

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <h1 className="fonts-heading3 pb-16pxr text-text-primary">공시</h1>
      {initialItems.length === 0 ? (
        <p className="text-text-secondary">공시 데이터가 없습니다.</p>
      ) : (
        <DisclosureInfiniteList initialItems={initialItems} initialPage={0} totalPages={totalPages} />
      )}
      <DisclosureAlertFab />
    </div>
  );
}

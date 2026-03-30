import AlertBanner from '@/components/common/AlertBanner';
import DisclosureInfiniteList from '@/components/disclosure/DisclosureInfiniteList';
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
    }));
    totalPages = data.totalPages;
  } catch {
    // fallback: empty list
  }

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <h1 className="fonts-heading3 pb-16pxr text-text-primary">공시</h1>
      <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <div className="min-w-0 flex-1">
          {initialItems.length === 0 ? (
            <p className="text-text-secondary">공시 데이터가 없습니다.</p>
          ) : (
            <DisclosureInfiniteList initialItems={initialItems} initialPage={0} totalPages={totalPages} />
          )}
        </div>
        <aside className="flex w-full flex-col gap-14pxr lg:w-96 lg:shrink-0">
          <AlertBanner
            title="🔔 공시 알림 받기"
            description="관심 기업의 새 공시를 실시간으로 받아보세요."
            buttonLabel="알림 설정하기"
            buttonHref="/mypage?tab=watchlist"
          />
        </aside>
      </div>
    </div>
  );
}

import DisclosureCard from '@/components/disclosure/DisclosureCard';
import AlertBanner from '@/components/common/AlertBanner';
import { fetchDisclosureList } from '@/api/disclosureApi';
import type { DisclosureListItem, DisclosureApiItem } from '@/types/disclosure';

export default async function DisclosurePage() {
  let items: DisclosureListItem[] = [];
  try {
    const data = await fetchDisclosureList({ size: 20 });
    items = data.content.map((item: DisclosureApiItem) => ({
      id: String(item.disclosureId),
      title: item.title,
      date: item.disclosedAt,
      category: item.companyName ?? '',
      companyName: item.companyName,
      summaryPoints: item.summary ? item.summary.split('\n').filter(Boolean) : [],
    }));
  } catch {
    // fallback: empty list
  }

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <h1 className="fonts-heading3 pb-16pxr text-text-primary">공시</h1>
      <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <div className="flex min-w-0 flex-1 flex-col gap-14pxr">
          {items.length === 0 ? (
            <p className="text-text-secondary">공시 데이터가 없습니다.</p>
          ) : (
            items.map((item) => <DisclosureCard key={item.id} item={item} />)
          )}
        </div>
        <aside className="flex w-full flex-col gap-14pxr lg:w-96 lg:shrink-0">
          <AlertBanner
            title="🔔 공시 알림 받기"
            description="관심 기업의 새 공시를 실시간으로 받아보세요."
            buttonLabel="알림 설정하기"
          />
        </aside>
      </div>
    </div>
  );
}

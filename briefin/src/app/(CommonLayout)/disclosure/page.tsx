import Link from 'next/link';
import DisclosureList from '@/components/disclosure/DisclosureList';
import AlertBanner from '@/components/common/AlertBanner';
import { MOCK_COMPANY_DISCLOSURES } from '@/mocks/disclosureDetail';

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-surface-bg pb-40pxr">
      <div className="pt-20pxr sm:pt-28pxr md:pt-36pxr">
        <Link
          href="/companies"
          className="inline-flex items-center gap-4pxr rounded-button border border-surface-border bg-surface-white px-12pxr py-8pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg sm:px-14pxr sm:py-10pxr sm:text-[14px]"
        >
          ← 목록으로
        </Link>
      </div>

      <h1 className="mt-20pxr fonts-heading2 text-text-primary">공시</h1>

      <div className="mt-20pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <div className="min-w-0 flex-1">
          <DisclosureList items={MOCK_COMPANY_DISCLOSURES} />
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

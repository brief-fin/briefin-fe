import Link from 'next/link';
import AlertBanner from '@/components/common/AlertBanner';
import { DisclosureSidebarProps } from '@/types/disclosure';

export default function DisclosureSidebar({
  recentDisclosures,
  companyName = '이 기업',
  onAlertClick,
}: DisclosureSidebarProps) {
  return (
    <aside className="flex w-full flex-col gap-20pxr lg:w-340pxr lg:shrink-0">
      <AlertBanner
        title="🔔 공시 알림 받기"
        description={`${companyName}의 새 공시가 올라오면 즉시 알려드려요.`}
        buttonLabel="알림 설정하기"
        onButtonClick={onAlertClick}
      />
      <div className="overflow-hidden rounded-card border border-surface-border bg-surface-white">
        <h2 className="border-b border-surface-border px-22pxr py-16pxr text-[13px] font-black text-text-primary">
          📋 최근 공시
        </h2>
        <ul className="divide-y divide-surface-border">
          {recentDisclosures.map((item) => (
            <li key={item.id}>
              <Link
                href={`/disclosure/${item.id}`}
                className="block px-22pxr py-16pxr transition-colors hover:bg-surface-bg">
                <p className="line-clamp-2 text-[14px] font-bold text-text-primary">{item.title}</p>
                <p className="fonts-caption mt-4pxr">
                  {item.date} · {item.category}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

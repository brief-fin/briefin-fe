'use client';

export type MyPageTab = '관심 기업' | '스크랩 뉴스' | '최근 본 뉴스' | '계정 관리';

const TABS: MyPageTab[] = ['관심 기업', '스크랩 뉴스', '최근 본 뉴스', '계정 관리'];

interface MyPageTabsProps {
  activeTab: MyPageTab;
  onTabChange: (tab: MyPageTab) => void;
}

export default function MyPageTabs({ activeTab, onTabChange }: MyPageTabsProps) {
  return (
    <div className="relative mx-24pxr flex border-b-2 border-surface-border">
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative h-46pxr px-16pxr text-[14px] font-bold transition-colors ${
              isActive
                ? 'text-primary after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-primary'
                : 'text-text-muted hover:text-text-secondary'
            }`}>
            {tab}
          </button>
        );
      })}
    </div>
  );
}

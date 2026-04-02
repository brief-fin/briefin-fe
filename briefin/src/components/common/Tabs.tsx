'use client';

import { TabsProps } from '@/types/common';

export default function Tabs<T extends string>({ tabs, activeTab, onTabChange, className = '', tabIcons }: TabsProps<T>) {
  return (
    <div className={`relative flex border-b-2 border-surface-border ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        const icon = tabIcons?.[tab];
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative inline-flex h-46pxr items-center gap-5pxr px-16pxr text-[14px] font-bold transition-colors ${
              isActive
                ? 'text-primary after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-text-muted hover:text-text-secondary'
            }`}>
            {icon && <span className="shrink-0">{icon}</span>}
            {tab}
          </button>
        );
      })}
    </div>
  );
}

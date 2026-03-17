'use client';

interface TabsProps<T extends string> {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
}

export default function Tabs<T extends string>({ tabs, activeTab, onTabChange, className = '' }: TabsProps<T>) {
  return (
    <div className={`relative flex border-b-2 border-surface-border ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative h-46pxr px-16pxr text-[14px] font-bold transition-colors ${
              isActive
                ? 'text-primary after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-text-muted hover:text-text-secondary'
            }`}>
            {tab}
          </button>
        );
      })}
    </div>
  );
}

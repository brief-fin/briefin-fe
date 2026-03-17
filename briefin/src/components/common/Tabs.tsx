'use client';

interface TabsProps<T extends string> {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

export default function Tabs<T extends string>({ tabs, activeTab, onTabChange }: TabsProps<T>) {
  return (
    <div className="relative mx-24pxr flex border-b-2 border-surface-border">
      {tabs.map((tab) => {
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

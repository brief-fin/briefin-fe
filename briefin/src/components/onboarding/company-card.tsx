'use client';

import type { Company } from '@/types/company';

interface CompanyCardProps {
  company: Company;
  selected: boolean;
  onToggle: () => void;
}

export default function CompanyCard({ company, selected, onToggle }: CompanyCardProps) {
  const { name, logo, industry, logoBg = 'bg-surface-muted' } = company;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex min-h-[72px] w-full cursor-pointer items-center rounded-[12px] border px-14pxr py-12pxr text-left transition-colors sm:min-h-0 sm:h-[82px] sm:rounded-[14px] sm:px-18pxr sm:py-0 ${
        selected
          ? 'border-primary bg-primary-light ring-2 ring-primary'
          : 'border-primary/60 border-dashed bg-surface-muted hover:border-primary hover:bg-surface-white'
      }`}
    >
      <div
        className={`flex size-[40px] shrink-0 items-center justify-center rounded-[10px] text-[18px] sm:size-[44px] sm:rounded-[12px] sm:text-[20px] ${logoBg}`}
      >
        {logo}
      </div>
      <div className="ml-10pxr min-w-0 flex-1 sm:ml-12pxr">
        <p
          className={`truncate text-[13px] font-bold leading-tight sm:text-[14px] sm:leading-5 ${
            selected ? 'text-primary-dark' : 'text-text-primary'
          }`}
        >
          {name}
        </p>
        <p className="mt-1pxr truncate text-[11px] font-normal leading-[15px] text-text-muted sm:mt-0 sm:text-[12px] sm:leading-[17px]">
          {industry}
        </p>
      </div>
    </button>
  );
}

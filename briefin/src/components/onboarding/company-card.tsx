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
      className={`flex w-full cursor-pointer items-center rounded-xl border px-14pxr py-12pxr text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-0 sm:h-80pxr sm:px-16pxr sm:py-0 ${
        selected
          ? 'border-primary bg-primary-light shadow-sm ring-2 ring-primary'
          : 'border-surface-border bg-surface-white shadow-sm hover:border-primary/50 hover:bg-surface-bg'
      }`}
    >
      <div
        className={`flex size-40pxr shrink-0 items-center justify-center rounded-[10px] text-[18px] sm:size-[42px] sm:rounded-xl sm:text-[20px] ${logoBg}`}
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
        <p className="mt-1pxr truncate text-11pxr font-normal leading-15pxr text-text-muted sm:mt-0 sm:text-12pxr sm:leading-[17px]">
          {industry}
        </p>
      </div>
    </button>
  );
}

'use client';

interface Company {
  id: number;
  name: string;
  sector: string;
  change: string;
  isRise: boolean;
  emoji: string;
  bgColor: string;
}

interface PopularCompanyListProps {
  title: string;
  companies: Company[];
  onCompanyClick?: (id: number) => void;
}

export default function PopularCompanyList({ title, companies, onCompanyClick }: PopularCompanyListProps) {
  return (
    <div className="rounded-card border border-surface-border bg-surface-white p-20pxr">
      <p className="text-[15px] font-black text-text-primary">{title}</p>
      <ul className="mt-8pxr divide-y divide-surface-border">
        {companies.map((company) => (
          <li
            key={company.id}
            onClick={() => onCompanyClick?.(company.id)}
            className={`flex items-center gap-12pxr py-12pxr ${onCompanyClick ? 'cursor-pointer hover:opacity-70' : ''}`}>
            <div className={`flex h-40pxr w-40pxr shrink-0 items-center justify-center rounded-button text-[18px] ${company.bgColor}`}>
              {company.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-bold text-text-primary">{company.name}</p>
              <p className="fonts-caption">{company.sector}</p>
            </div>
            <p className={`shrink-0 text-[13px] font-bold ${company.isRise ? 'text-semantic-red' : 'text-semantic-neutral'}`}>
              {company.change}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type { Company };

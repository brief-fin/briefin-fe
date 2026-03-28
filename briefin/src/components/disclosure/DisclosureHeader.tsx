import { DisclosureHeaderProps } from '@/types/disclosure';

export default function DisclosureHeader({
  data: { category, date, source, title, companyName, reportNumber },
}: DisclosureHeaderProps) {
  const subLine = [companyName, reportNumber && `공시번호 ${reportNumber}`].filter(Boolean).join(' · ');

  return (
    <header className="space-y-12pxr">
      <div className="flex flex-wrap items-center gap-8pxr">
        <span className="rounded-badge bg-primary-light px-10pxr py-4pxr text-[10px] font-black tracking-wider text-primary-dark">
          📋 DART 공시
        </span>
        {category && (
          <span className="rounded-badge bg-primary-light px-10pxr py-4pxr text-[11px] font-bold text-primary-dark">
            {category}
          </span>
        )}
      </div>
      <div className="fonts-caption flex flex-wrap items-center gap-16pxr text-text-muted">
        {source && <span>{source}</span>}
        <span>{date}</span>
      </div>
      <h1 className="fonts-heading3 text-text-primary">{title}</h1>
      {subLine && <p className="text-[14px] font-normal text-text-muted">{subLine}</p>}
    </header>
  );
}

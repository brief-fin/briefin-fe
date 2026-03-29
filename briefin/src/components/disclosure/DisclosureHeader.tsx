import { DisclosureHeaderProps } from '@/types/disclosure';

function formatKoreanDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}

export default function DisclosureHeader({
  data: { category, date, title, companyName, ticker },
}: DisclosureHeaderProps) {
  return (
    <header className="space-y-12pxr">
      {/* 회사명 + ticker / category 배지 */}
      <div className="flex items-start justify-between gap-12pxr">
        <div className="min-w-0">
          {companyName && (
            <p className="fonts-heading3 truncate font-bold text-text-primary">{companyName}</p>
          )}
        </div>
        {category && (
          <span className="shrink-0 rounded-pill border border-primary px-12pxr py-4pxr text-[11px] font-semibold text-primary">
            {category}
          </span>
        )}
      </div>

      {/* 공시 제목 */}
      <h1 className="fonts-heading4 break-keep text-text-primary">{title}</h1>

      {/* 날짜 */}
      <p className="fonts-caption text-text-muted">{formatKoreanDate(date)}</p>
    </header>
  );
}

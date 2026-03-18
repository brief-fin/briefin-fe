import type { DisclosureDetail } from '@/types/disclosure';

interface DisclosureDetailsProps {
  details: DisclosureDetail['details'];
}

const ROWS: { key: keyof DisclosureDetail['details']; label: string; highlight?: boolean }[] = [
  { key: 'partner', label: '계약 상대방' },
  { key: 'content', label: '계약 내용' },
  { key: 'amount', label: '계약 금액', highlight: true },
  { key: 'period', label: '계약 기간' },
  { key: 'ratio', label: '매출액 대비' },
  { key: 'reportType', label: '공시 구분' },
];

export default function DisclosureDetails({ details }: DisclosureDetailsProps) {
  return (
    <div className="rounded-summary bg-surface-bg p-20pxr">
      <dl className="space-y-0">
        {ROWS.map(({ key, label, highlight }) => {
          const value = details[key as keyof typeof details];
          if (value == null) return null;
          return (
            <div
              key={key}
              className="flex border-b border-surface-border py-14pxr first:pt-0 last:border-b-0 last:pb-0">
              <dt className="w-140pxr shrink-0 text-[14px] font-bold leading-7 text-text-muted">{label}</dt>
              <dd
                className={`min-w-0 flex-1 text-[14px] leading-7 ${
                  highlight ? 'font-bold text-primary' : 'font-normal text-text-secondary'
                }`}>
                {value}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

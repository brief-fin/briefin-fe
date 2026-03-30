import { DisclosureDetailsProps } from '@/types/disclosure';
import { ROWS } from '@/constants/disclosure';

export default function DisclosureDetails({ details }: DisclosureDetailsProps) {
  // `1,240,000,000,000원`처럼 숫자+단위가 붙어있는 문자열은
  // 모바일에서 줄바꿈 기회가 부족해 overflow가 날 수 있어 단위(`원`)만 붙여주고,
  // 실제 줄바꿈은 CSS의 overflow-wrap로 처리합니다.
  function normalizeAmountForWrap(value: string) {
    return value.replace(/(\d[\d,]*)원/g, '$1\u00A0원');
  }

  return (
    <div className="my-20pxr rounded-summary bg-surface-bg p-20pxr">
      <dl className="space-y-0">
        {ROWS.map(({ key, label, highlight }) => {
          const value = details[key as keyof typeof details];
          if (value == null) return null;

          const displayValue = key === 'amount' ? normalizeAmountForWrap(value) : value;

          return (
            <div
              key={key}
              className="min-w-0 flex flex-col border-b border-surface-border py-14pxr first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:gap-0">
              <dt className="w-full shrink-0 text-[14px] font-bold leading-7 text-text-muted sm:w-140pxr">{label}</dt>
              <dd
                className={`min-w-0 flex-1 text-[14px] leading-7 whitespace-normal break-words [overflow-wrap:anywhere] ${
                  highlight ? 'font-bold text-primary' : 'font-normal text-text-secondary'
                }`}>
                {displayValue}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

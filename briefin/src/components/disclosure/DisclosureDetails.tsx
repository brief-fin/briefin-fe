import { DisclosureDetailsProps } from '@/types/disclosure';
import { ROWS } from '@/constants/disclosure';

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

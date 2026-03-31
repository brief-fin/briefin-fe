import { CheckIcon } from '../../../public/icon';
import { NewsSummaryProps } from '@/types/news';

export default function NewsSummary({ summaries }: NewsSummaryProps) {
  if (!summaries || summaries.length === 0) return null;

  return (
    <div className="rounded-summary bg-primary-subtle border border-primary-mid p-20pxr">
      <p className="mb-12pxr text-[11px] font-black uppercase tracking-[1.5px] text-primary">핵심 요약</p>
      <ul className="space-y-10pxr">
        {summaries.map((point, i) => (
          <li key={i} className="flex items-start gap-8pxr">
            <CheckIcon className="mt-[3px] shrink-0" />
            <span className="text-[14px] font-normal leading-[22px] break-keep text-primary-dark">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

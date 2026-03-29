import { DisclosureSummaryProps } from '@/types/disclosure';

const CIRCLE_NUMBERS = ['①', '②', '③', '④', '⑤'];

export default function DisclosureSummary({ summaryPoints }: DisclosureSummaryProps) {
  return (
    <div className="mt-24pxr rounded-summary bg-primary-subtle p-20pxr">
      <h2 className="fonts-label mb-14pxr font-bold text-primary">핵심 요약</h2>
      <ul className="space-y-12pxr">
        {summaryPoints.map((point, i) => (
          <li key={i} className="flex gap-10pxr">
            <span className="shrink-0 text-[15px] font-black text-primary">
              {CIRCLE_NUMBERS[i] ?? `${i + 1}.`}
            </span>
            <span className="fonts-body leading-relaxed text-text-secondary">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

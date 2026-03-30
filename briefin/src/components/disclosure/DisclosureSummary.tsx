import { DisclosureSummaryProps } from '@/types/disclosure';

export default function DisclosureSummary({ summaryPoints }: DisclosureSummaryProps) {
  return (
    <div className="my-20pxr rounded-summary bg-primary-light p-18pxr">
      <ul className="space-y-12pxr">
        {summaryPoints.map((point, i) => (
          <li key={i} className="flex gap-8pxr text-[13px] leading-[19.5px] text-primary-dark">
            <span className="shrink-0 font-black">✓</span>
            <span className="font-normal">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

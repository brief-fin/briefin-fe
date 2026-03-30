import { DisclosureKeyPointsProps } from '@/types/disclosure';

export default function DisclosureKeyPoints({ keyPoints }: DisclosureKeyPointsProps) {
  if (keyPoints.length === 0) return null;

  return (
    <div className="mt-24pxr">
      <h2 className="fonts-label mb-14pxr font-bold text-text-primary">핵심 포인트</h2>
      <div className="space-y-8pxr">
        {keyPoints.map((point, i) => (
          <div
            key={i}
            className="flex gap-12pxr rounded-card border border-surface-border bg-surface-white px-16pxr py-14pxr shadow-hero-card">
            <span className="mt-1pxr shrink-0 text-[14px] font-black text-primary">✓</span>
            <span className="fonts-body leading-relaxed text-text-secondary">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

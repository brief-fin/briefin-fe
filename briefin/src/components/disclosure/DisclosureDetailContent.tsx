import { DisclosureDetailContentProps } from '@/types/disclosure';

export default function DisclosureDetailContent({ detailedContent }: DisclosureDetailContentProps) {
  return (
    <div className="mt-24pxr">
      <h2 className="fonts-label mb-14pxr font-bold text-text-primary">상세 내용</h2>
      <div className="rounded-summary bg-surface-bg px-20pxr py-20pxr">
        <p className="fonts-body whitespace-pre-line leading-[1.8] text-text-secondary">{detailedContent}</p>
      </div>
    </div>
  );
}

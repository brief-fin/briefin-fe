interface DisclosureActionButtonsProps {
  url: string;
  documentUrl?: string | null;
}

export default function DisclosureBtn({ url, documentUrl }: DisclosureActionButtonsProps) {
  return (
    <div className="mt-24pxr flex flex-wrap items-center gap-12pxr border-t border-surface-border pt-20pxr">
      <a
        href={documentUrl ?? url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-button border border-surface-border bg-surface-white px-20pxr py-12pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg">
        📄 원본 보고서 보기 (DART)
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-button border border-surface-border bg-surface-white px-20pxr py-12pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg">
        🔗 원문 공시 바로가기
      </a>
    </div>
  );
}

import { NewsActionsProps } from '@/types/news';

export default function NewsActions({ originalUrl }: Pick<NewsActionsProps, 'originalUrl'>) {
  if (!originalUrl) return null;

  return (
    <div className="mt-28pxr border-t border-surface-border pt-20pxr">
      <a
        href={originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-6pxr rounded-button border border-surface-border bg-surface-white px-16pxr py-10pxr text-[13px] font-bold text-text-secondary transition-colors hover:border-text-muted hover:bg-surface-bg">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        원문 기사 보기
      </a>
    </div>
  );
}

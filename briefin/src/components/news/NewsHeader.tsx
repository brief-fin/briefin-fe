import { NewsHeaderProps } from '@/types/news';
import { formatDateTime } from '@/utils/date';

export default function NewsHeader({
  data: { category, publishedAt, source, title },
  isScrapped,
  onToggleScrap,
}: NewsHeaderProps) {
  return (
    <header className="space-y-14pxr">
      <div className="flex flex-wrap items-center gap-8pxr">
        {category && (
          <span className="rounded-badge bg-primary-light px-10pxr py-4pxr text-[11px] font-bold text-primary-dark">
            {category}
          </span>
        )}
        <div className="fonts-caption flex flex-wrap items-center gap-6pxr text-text-muted">
          {source && <span className="font-medium">{source}</span>}
          {source && publishedAt && <span>·</span>}
          {publishedAt && <span>{formatDateTime(publishedAt)}</span>}
        </div>
      </div>
      <div className="flex items-start justify-between gap-12pxr">
        <h1 className="leading-38pxr break-keep text-[24px] font-black tracking-[-0.6px] text-text-primary">{title}</h1>
        {onToggleScrap && (
          <button
            type="button"
            onClick={onToggleScrap}
            aria-label={isScrapped ? '스크랩 취소' : '스크랩'}
            className="-mr-6pxr mt-4pxr shrink-0 rounded-full p-6pxr transition-colors hover:bg-surface-bg">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={isScrapped ? '#1E3A8A' : 'none'}
              stroke={isScrapped ? '#1E3A8A' : '#9CA3AF'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

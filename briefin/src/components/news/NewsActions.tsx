import { NewsActionsProps } from '@/types/news';

export default function NewsActions({ originalUrl, isScrapped, onToggleScrap }: NewsActionsProps) {
  return (
    <div className="mt-24pxr flex flex-wrap items-center justify-between border-t border-surface-border pt-20pxr">
      {originalUrl ? (
        <a
          href={originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-button border border-surface-border bg-surface-white px-20pxr py-12pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg">
          🔗 원문 기사 보기
        </a>
      ) : (
        <span />
      )}
      <button
        onClick={onToggleScrap}
        className="text-24pxr transition-transform hover:scale-110"
        aria-label={isScrapped ? '스크랩 취소' : '스크랩'}>
        {isScrapped ? '★' : '☆'}
      </button>
    </div>
  );
}

import { NewsActionsProps } from '@/types/news';

export default function NewsActions({ originalUrl, isScrapped }: NewsActionsProps) {
  return (
    <div className="mt-24pxr flex flex-wrap items-center justify-between border-t border-surface-border pt-20pxr">
      <a
        href={originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-button border border-surface-border bg-surface-white px-20pxr py-12pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg">
        🔗 원문 기사 보기
      </a>
      <button className="text-24pxr">{isScrapped ? '★' : '☆'}</button>
    </div>
  );
}

import { DisclosureBtnProps } from '@/types/disclosure';

export default function DisclosureBtn({ url }: DisclosureBtnProps) {
  return (
    <div className="mt-28pxr border-t border-surface-border pt-20pxr">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-8pxr rounded-button bg-primary px-20pxr py-14pxr text-[14px] font-bold text-white transition-colors hover:bg-primary-dark">
        DART 원문 보기
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}

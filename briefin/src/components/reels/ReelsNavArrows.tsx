export interface ReelsNavArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function ReelsNavArrows({ onPrev, onNext }: ReelsNavArrowsProps) {
  return (
    <>
      <button
        type="button"
        aria-label="이전 뉴스"
        onClick={onPrev}
        className="pointer-events-auto absolute left-12pxr top-1/2 z-40 flex h-48pxr w-48pxr -translate-y-1/2 items-center justify-center rounded-full border border-surface-border bg-surface-white/95 text-2xl font-bold leading-none text-primary shadow-hero-card opacity-0 transition-opacity duration-200 hover:bg-primary-light group-hover/reelnav:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:left-16pxr">
        ‹
      </button>
      <button
        type="button"
        aria-label="다음 뉴스"
        onClick={onNext}
        className="pointer-events-auto absolute right-64pxr top-1/2 z-40 flex h-48pxr w-48pxr -translate-y-1/2 items-center justify-center rounded-full border border-surface-border bg-surface-white/95 text-2xl font-bold leading-none text-primary shadow-hero-card opacity-0 transition-opacity duration-200 hover:bg-primary-light group-hover/reelnav:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:right-72pxr">
        ›
      </button>
    </>
  );
}

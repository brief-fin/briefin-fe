import type { RefObject } from 'react';
import ReelSlide from '@/components/reels/ReelSlide';
import ReelsActionRail from '@/components/reels/ReelsActionRail';
import type { ReelNews } from '@/types/reelNews';

export interface ReelFeedPanelProps {
  feedRef: RefObject<HTMLDivElement | null>;
  reels: ReelNews[];
  current: number;
  progress: number;
  goTo: (index: number) => void;
  scrapped: Set<string>;
  onToggleScrap: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ReelFeedPanel({
  feedRef,
  reels,
  current,
  progress,
  scrapped,
  onToggleScrap,
  goTo,
  onMouseEnter,
  onMouseLeave,
}: ReelFeedPanelProps) {
  const canPrev = current > 0;
  const canNext = current < reels.length - 1;

  return (
    <div
      className="group/reelnav relative h-full min-w-0 flex-1 border-r border-white/10"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div
        ref={feedRef}
        className="flex h-full w-full snap-x snap-mandatory flex-nowrap overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}>
        {reels.map((r, i) => (
          <ReelSlide key={r.id} reel={r} index={i} activeIndex={current} isActive={i === current} progress={progress} />
        ))}
      </div>

      {/* 이전 화살표 */}
      {canPrev && (
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          aria-label="이전"
          className="absolute left-10pxr top-1/2 z-20 flex h-36pxr w-36pxr -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 opacity-0 backdrop-blur-sm transition-all hover:bg-white/25 hover:text-white group-hover/reelnav:opacity-100">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* 다음 화살표 */}
      {canNext && (
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          aria-label="다음"
          className="absolute right-68pxr top-1/2 z-20 flex h-36pxr w-36pxr -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 opacity-0 backdrop-blur-sm transition-all hover:bg-white/25 hover:text-white group-hover/reelnav:opacity-100 sm:right-76pxr">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {reels[current] && (
        <ReelsActionRail
          newsId={reels[current].id}
          isScrapped={scrapped.has(reels[current].id)}
          onToggleScrap={onToggleScrap}
        />
      )}
    </div>
  );
}

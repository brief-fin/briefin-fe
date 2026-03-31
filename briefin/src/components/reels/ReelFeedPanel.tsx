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
  scrapped: Set<number>;
  onToggleScrap: () => void;
}

export default function ReelFeedPanel({
  feedRef,
  reels,
  current,
  progress,
  scrapped,
  onToggleScrap,
}: ReelFeedPanelProps) {
  return (
    <div className="group/reelnav relative h-full min-w-0 flex-1 border-r border-surface-border">
      <div
        ref={feedRef}
        className="flex h-full w-full snap-x snap-mandatory flex-nowrap overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}>
        {reels.map((r, i) => (
          <ReelSlide key={r.id} reel={r} index={i} activeIndex={current} isActive={i === current} progress={progress} />
        ))}
      </div>

      <ReelsActionRail newsId={reels[current].id} isScrapped={scrapped.has(reels[current].id)} onToggleScrap={onToggleScrap} />
    </div>
  );
}

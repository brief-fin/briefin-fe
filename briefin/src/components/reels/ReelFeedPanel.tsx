import type { RefObject } from 'react';
import ReelSlide from '@/components/reels/ReelSlide';
import ReelsActionRail from '@/components/reels/ReelsActionRail';
import ReelsNavArrows from '@/components/reels/ReelsNavArrows';
import type { ReelNews } from '@/types/reelNews';

export interface ReelFeedPanelProps {
  feedRef: RefObject<HTMLDivElement | null>;
  reels: ReelNews[];
  current: number;
  progress: number;
  goTo: (index: number) => void;
  scrapped: Set<number>;
  alerted: Set<number>;
  onToggleScrap: () => void;
  onToggleAlert: () => void;
}

export default function ReelFeedPanel({
  feedRef,
  reels,
  current,
  progress,
  goTo,
  scrapped,
  alerted,
  onToggleScrap,
  onToggleAlert,
}: ReelFeedPanelProps) {
  return (
    <div className="group/reelnav relative h-full min-w-0 flex-1 border-r border-surface-border">
      <div
        ref={feedRef}
        className="flex h-full w-full snap-x snap-mandatory flex-nowrap overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}>
        {reels.map((r, i) => (
          <ReelSlide
            key={r.id}
            reel={r}
            index={i}
            activeIndex={current}
            isActive={i === current}
            progress={progress}
          />
        ))}
      </div>

      <ReelsNavArrows onPrev={() => goTo(current - 1)} onNext={() => goTo(current + 1)} />

      <ReelsActionRail
        newsId={reels[current].id}
        isAlerted={alerted.has(current)}
        isScrapped={scrapped.has(current)}
        onToggleAlert={onToggleAlert}
        onToggleScrap={onToggleScrap}
      />
    </div>
  );
}

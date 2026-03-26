'use client';

import ReelFeedPanel from '@/components/reels/ReelFeedPanel';
import ReelsRelatedPanel from '@/components/reels/ReelsRelatedPanel';
import { useReelsFeed } from '@/hooks/useReelsFeed';
import { MOCK_REELS } from '@/mocks/reelNews';

export default function ReelsClient() {
  const { feedRef, current, progress, goTo, reel, scrapped, toggleScrap, reels } = useReelsFeed(MOCK_REELS);

  return (
    <div className="flex h-[min(640px,calc(100dvh-240px))] min-h-[min(640px,calc(100dvh-240px))] w-full overflow-hidden rounded-card border border-surface-border bg-surface-white shadow-hero-card lg:h-[min(720px,calc(100dvh-200px))] lg:min-h-[min(720px,calc(100dvh-200px))]">
      <div className="flex h-full w-full min-w-0 items-stretch">
        <ReelFeedPanel
          feedRef={feedRef}
          reels={reels}
          current={current}
          progress={progress}
          goTo={goTo}
          scrapped={scrapped}
          onToggleScrap={toggleScrap}
        />
        <ReelsRelatedPanel reel={reel} reels={reels} onGoTo={goTo} />
      </div>
    </div>
  );
}

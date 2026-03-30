'use client';

import ReelFeedPanel from '@/components/reels/ReelFeedPanel';
import ReelsRelatedPanel from '@/components/reels/ReelsRelatedPanel';
import { useReelsFeed } from '@/hooks/useReelsFeed';
import { useReels } from '@/hooks/useReels';
import { toReelNews } from '@/api/reelsApi';

export default function ReelsClient() {
  const { data, isLoading, isError } = useReels();
  const reels = data?.map(toReelNews) ?? [];
  const { feedRef, current, progress, goTo, reel, scrapped, toggleScrap } = useReelsFeed(reels);

  if (isLoading) {
    return (
      <div className="flex h-[min(640px,calc(100dvh-240px))] w-full items-center justify-center rounded-card border border-surface-border bg-surface-white">
        <p className="fonts-label text-text-muted">릴스를 불러오는 중...</p>
      </div>
    );
  }

  if (isError || reels.length === 0) {
    return (
      <div className="flex h-[min(640px,calc(100dvh-240px))] w-full items-center justify-center rounded-card border border-surface-border bg-surface-white">
        <p className="fonts-label text-text-muted">릴스를 불러오지 못했습니다.</p>
      </div>
    );
  }

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

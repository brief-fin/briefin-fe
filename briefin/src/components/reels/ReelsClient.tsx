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
      <div className="flex h-[min(640px,calc(100dvh-240px))] w-full overflow-hidden rounded-card border border-surface-border bg-surface-white shadow-hero-card lg:h-[min(720px,calc(100dvh-200px))]">
        {/* 슬라이드 영역 */}
        <div className="relative min-w-0 flex-1 animate-pulse bg-gradient-to-b from-primary-light/40 to-surface-white">
          <div className="absolute inset-0 flex flex-col justify-center pl-72pxr pr-120pxr sm:pl-80pxr sm:pr-128pxr">
            <div className="w-full max-w-2xl">
              {/* 배지 + 출처 */}
              <div className="mb-12pxr flex items-center gap-8pxr">
                <div className="h-18pxr w-28pxr rounded bg-gray-300" />
                <div className="h-18pxr w-32pxr rounded bg-gray-200" />
                <div className="h-18pxr w-24 rounded bg-gray-200" />
                <div className="h-18pxr w-16 rounded bg-gray-200" />
              </div>
              {/* 제목 */}
              <div className="mb-18pxr flex flex-col gap-10pxr">
                <div className="h-7 w-full rounded bg-gray-200" />
                <div className="h-7 w-4/5 rounded bg-gray-200" />
              </div>
              {/* 요약 포인트 */}
              <div className="mb-18pxr flex flex-col gap-10pxr">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-10pxr">
                    <div className="mt-2pxr h-15pxr w-15pxr shrink-0 rounded-full bg-gray-200" />
                    <div className="flex flex-1 flex-col gap-6pxr">
                      <div className="h-4 w-full rounded bg-gray-200" />
                      {i === 1 && <div className="h-4 w-3/4 rounded bg-gray-200" />}
                    </div>
                  </div>
                ))}
              </div>
              {/* 태그 */}
              <div className="flex gap-6pxr">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-22pxr w-16 rounded-full bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
          {/* 프로그레스 바 */}
          <div className="absolute bottom-0 left-0 right-0 h-2pxr bg-gray-200" />
        </div>

        {/* 우측 패널 (lg 이상) */}
        <div className="hidden animate-pulse flex-col gap-16pxr overflow-y-auto bg-surface-muted/50 px-24pxr py-28pxr lg:flex lg:w-[min(100%,520px)] lg:min-w-400pxr xl:min-w-460pxr">
          <div className="h-3 w-20 rounded bg-gray-200" />
          {/* 기업 카드 */}
          <div className="rounded-hero border border-surface-border bg-surface-white p-20pxr">
            <div className="mb-8pxr h-5 w-32 rounded bg-gray-200" />
            <div className="mb-10pxr h-3 w-24 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
          <div className="mt-4pxr h-3 w-24 rounded bg-gray-200" />
          {/* 관련 뉴스 */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-6pxr px-4pxr py-14pxr">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-3 w-28 rounded bg-gray-200" />
            </div>
          ))}
        </div>
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

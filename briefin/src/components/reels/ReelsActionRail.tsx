import Link from 'next/link';
import { useRef } from 'react';
import { ReelsActionRailProps } from '@/types/reelNews';

export default function ReelsActionRail({ newsId, isScrapped, onToggleScrap }: ReelsActionRailProps) {
  const isSharingRef = useRef(false);

  const handleShare = async () => {
    if (isSharingRef.current) return;

    const url = `${window.location.origin}/news/${newsId}`;

    if (navigator.share) {
      try {
        isSharingRef.current = true;
        await navigator.share({ title: '뉴스 공유', url });
      } catch (e) {
        // 유저가 공유 취소한 경우 무시
      } finally {
        isSharingRef.current = false;
      }
    } else {
      navigator.clipboard.writeText(url).then(() => alert('링크가 복사되었습니다!'));
    }
  };

  return (
    <div className="pointer-events-none absolute right-8pxr top-1/2 z-30 flex w-52pxr -translate-y-1/2 flex-col justify-center sm:right-12pxr">
      <div className="pointer-events-auto flex flex-col gap-16pxr pb-4pxr">
        <button type="button" onClick={onToggleScrap} className="flex w-full flex-col items-center gap-2pxr">
          <div
            className={`flex h-40pxr w-40pxr items-center justify-center rounded-full border text-[16px] shadow-stat-chip transition-all ${
              isScrapped
                ? 'border-primary bg-primary-light'
                : 'border-surface-border bg-surface-white hover:bg-surface-bg'
            }`}>
            🔖
          </div>
          <span className="w-full text-center text-[10px] font-semibold leading-tight text-text-secondary">스크랩</span>
        </button>

        <Link href={`/news/${newsId}`} className="flex w-full flex-col items-center gap-2pxr">
          <div className="flex h-40pxr w-40pxr items-center justify-center rounded-full border border-surface-border bg-surface-white text-[15px] shadow-stat-chip transition-all hover:bg-surface-bg">
            📄
          </div>
          <span className="w-full text-center text-[10px] font-semibold leading-tight text-text-secondary">원문</span>
        </Link>

        <button type="button" onClick={handleShare} className="flex w-full flex-col items-center gap-2pxr">
          <div className="flex h-40pxr w-40pxr items-center justify-center rounded-full border border-surface-border bg-surface-white text-[16px] shadow-stat-chip transition-all hover:bg-surface-bg">
            ↗
          </div>
          <span className="w-full text-center text-[10px] font-semibold leading-tight text-text-secondary">공유</span>
        </button>
      </div>
    </div>
  );
}

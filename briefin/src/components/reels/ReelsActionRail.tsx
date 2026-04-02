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
      } catch {
        // 유저가 공유 취소한 경우 무시
      } finally {
        isSharingRef.current = false;
      }
    } else {
      navigator.clipboard.writeText(url).then(() => alert('링크가 복사되었습니다!'));
    }
  };

  const btnBase =
    'flex h-42pxr w-42pxr items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white';

  return (
    <div className="pointer-events-none absolute right-8pxr top-1/2 z-30 flex w-52pxr -translate-y-1/2 flex-col justify-center sm:right-12pxr">
      <div className="pointer-events-auto flex flex-col gap-16pxr pb-4pxr">
        {/* 스크랩 */}
        <button type="button" onClick={onToggleScrap} className="flex w-full flex-col items-center gap-4pxr">
          <div className={`${btnBase} ${isScrapped ? 'border-primary bg-primary text-white hover:bg-primary' : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isScrapped ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className={`w-full text-center text-[10px] font-semibold leading-tight ${isScrapped ? 'text-primary' : 'text-white/50'}`}>
            {isScrapped ? '저장됨' : '저장'}
          </span>
        </button>

        {/* 원문 */}
        <Link href={`/news/${newsId}`} className="flex w-full flex-col items-center gap-4pxr">
          <div className={btnBase}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <span className="w-full text-center text-[10px] font-semibold leading-tight text-white/50">원문</span>
        </Link>

        {/* 공유 */}
        <button type="button" onClick={handleShare} className="flex w-full flex-col items-center gap-4pxr">
          <div className={btnBase}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <span className="w-full text-center text-[10px] font-semibold leading-tight text-white/50">공유</span>
        </button>
      </div>
    </div>
  );
}

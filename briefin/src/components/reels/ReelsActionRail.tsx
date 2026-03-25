import Link from 'next/link';

export interface ReelsActionRailProps {
  newsId: number;
  isAlerted: boolean;
  isScrapped: boolean;
  onToggleAlert: () => void;
  onToggleScrap: () => void;
}

export default function ReelsActionRail({
  newsId,
  isAlerted,
  isScrapped,
  onToggleAlert,
  onToggleScrap,
}: ReelsActionRailProps) {
  return (
    <div className="pointer-events-none absolute bottom-96pxr right-8pxr top-20pxr z-30 flex w-52pxr flex-col justify-end sm:right-12pxr">
      <div className="pointer-events-auto flex flex-col gap-16pxr pb-4pxr">
        <button type="button" onClick={onToggleAlert} className="flex w-full flex-col items-center gap-2pxr">
          <div
            className={`flex h-40pxr w-40pxr items-center justify-center rounded-full border text-[16px] shadow-stat-chip transition-all ${
              isAlerted
                ? 'border-primary bg-primary-light'
                : 'border-surface-border bg-surface-white hover:bg-surface-bg'
            }`}>
            🔔
          </div>
          <span className="w-full text-center text-[10px] font-semibold leading-tight text-text-secondary">알림</span>
        </button>

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

        <button type="button" className="flex w-full flex-col items-center gap-2pxr">
          <div className="flex h-40pxr w-40pxr items-center justify-center rounded-full border border-surface-border bg-surface-white text-[16px] shadow-stat-chip transition-all hover:bg-surface-bg">
            ↗
          </div>
          <span className="w-full text-center text-[10px] font-semibold leading-tight text-text-secondary">공유</span>
        </button>

        <button type="button" className="flex w-full flex-col items-center gap-2pxr">
          <div className="flex h-40pxr w-40pxr items-center justify-center rounded-full border border-surface-border bg-surface-white text-[14px] shadow-stat-chip transition-all hover:bg-surface-bg">
            ···
          </div>
          <span className="w-full text-center text-[10px] font-semibold leading-tight text-text-secondary">더보기</span>
        </button>
      </div>
    </div>
  );
}

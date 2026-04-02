import type { ReelNews } from '@/types/reelNews';

export interface ReelsRelatedPanelProps {
  reel: ReelNews;
  reels: ReelNews[];
  current: number;
  onGoTo: (index: number) => void;
}

export default function ReelsRelatedPanel({ reel, reels, current, onGoTo }: ReelsRelatedPanelProps) {
  if (!reel) return null;

  return (
    <div className="hidden min-h-0 w-full shrink-0 flex-col overflow-y-auto bg-[#161b22] [-ms-overflow-style:none] [scrollbar-width:none] lg:flex lg:w-[min(100%,480px)] lg:min-w-380pxr xl:min-w-440pxr [&::-webkit-scrollbar]:hidden">

      {/* 현재 뉴스 정보 */}
      <div className="border-b border-white/8 px-24pxr py-24pxr">
        <div className="mb-10pxr flex flex-wrap items-center gap-8pxr">
          {reel.category && (
            <span className="rounded-full bg-white/10 px-10pxr py-3pxr text-[11px] font-semibold text-white/60">
              {reel.category}
            </span>
          )}
        </div>
        <p className="mb-12pxr text-[15px] font-bold leading-snug text-white/90 line-clamp-2">{reel.title}</p>
        <p className="text-[12px] text-white/30">
          {reel.source}
          {reel.time && <span> · {reel.time}</span>}
        </p>

        {/* 관련 기업 칩 */}
        {reel.tags.length > 0 && (
          <div className="mt-14pxr flex flex-wrap gap-6pxr">
            {reel.tags.map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/10 bg-white/5 px-10pxr py-4pxr text-[11px] font-medium text-white/50">
                {name}
              </span>
            ))}
          </div>
        )}

      </div>

      {/* 플레이리스트 */}
      <div className="flex flex-col px-12pxr py-16pxr">
        <p className="mb-10pxr px-12pxr text-[11px] font-semibold uppercase tracking-widest text-white/25">
          추천 뉴스
        </p>
        {reels.map((r, idx) => {
          const isActive = idx === current;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onGoTo(idx)}
              className={`flex w-full items-start gap-12pxr rounded-xl px-12pxr py-12pxr text-left transition-colors ${
                isActive ? 'bg-white/10' : 'hover:bg-white/5'
              }`}>
              {/* 순서 번호 or 재생 중 표시 */}
              <div className="mt-1pxr flex h-20pxr w-20pxr shrink-0 items-center justify-center">
                {isActive ? (
                  <span className="flex gap-2pxr">
                    <span className="h-10pxr w-2pxr animate-bounce rounded-full bg-primary" style={{ animationDelay: '0ms' }} />
                    <span className="h-10pxr w-2pxr animate-bounce rounded-full bg-primary" style={{ animationDelay: '150ms' }} />
                    <span className="h-10pxr w-2pxr animate-bounce rounded-full bg-primary" style={{ animationDelay: '300ms' }} />
                  </span>
                ) : (
                  <span className="text-[12px] font-bold text-white/25">{idx + 1}</span>
                )}
              </div>

              {/* 제목 + 메타 */}
              <div className="min-w-0 flex-1">
                <p className={`line-clamp-2 text-[13px] font-semibold leading-snug ${isActive ? 'text-white' : 'text-white/55'}`}>
                  {r.title}
                </p>
                <p className="mt-4pxr text-[11px] text-white/25">{r.source}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

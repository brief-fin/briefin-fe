import { findReelIndexByRelatedTitle } from '@/components/reels/reelNewsUtils';
import type { ReelNews } from '@/types/reelNews';

export interface ReelsRelatedPanelProps {
  reel: ReelNews;
  reels: ReelNews[];
  onGoTo: (index: number) => void;
}

export default function ReelsRelatedPanel({ reel, reels, onGoTo }: ReelsRelatedPanelProps) {
  if (!reel) return null;

  return (
    <div className="hidden min-h-0 w-full shrink-0 flex-col gap-16pxr overflow-y-auto bg-surface-muted/50 px-24pxr py-28pxr [-ms-overflow-style:none] [scrollbar-width:none] lg:flex lg:w-[min(100%,520px)] lg:min-w-400pxr xl:min-w-460pxr [&::-webkit-scrollbar]:hidden">
      <p className="fonts-overline text-[11px] tracking-wide">관련 기업</p>
      {reel.tags.length === 0 ? (
        <p className="fonts-bodySmall text-text-muted">관련 기업 정보가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-8pxr">
          {reel.tags.map((name) => (
            <div key={name} className="rounded-hero border border-surface-border bg-surface-white px-20pxr py-14pxr shadow-hero-card">
              <p className="text-[15px] font-bold text-text-primary">🏢 {name}</p>
            </div>
          ))}
        </div>
      )}

      <p className="fonts-overline mt-4pxr text-[11px] tracking-wide">관련 뉴스</p>
      {reel.relatedNews.map((n, ri) => {
        const targetIdx = findReelIndexByRelatedTitle(reels, n.title);
        return (
          <button
            key={`${n.title}-${ri}`}
            type="button"
            className="cursor-pointer rounded-summary border border-transparent px-4pxr py-14pxr text-left transition-colors hover:border-surface-border hover:bg-surface-white/80"
            onClick={() => {
              if (targetIdx !== -1) onGoTo(targetIdx);
            }}>
            <p className="fonts-bodySmall mb-6pxr font-bold leading-snug text-text-primary">{n.title}</p>
            <p className="fonts-bodySmall text-text-muted">
              {n.source} · {n.time}
            </p>
          </button>
        );
      })}
    </div>
  );
}

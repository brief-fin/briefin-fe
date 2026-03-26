import { findReelIndexByRelatedTitle } from '@/components/reels/reelNewsUtils';
import type { ReelNews } from '@/types/reelNews';

export interface ReelsRelatedPanelProps {
  reel: ReelNews;
  reels: ReelNews[];
  onGoTo: (index: number) => void;
}

export default function ReelsRelatedPanel({ reel, reels, onGoTo }: ReelsRelatedPanelProps) {
  return (
    <div className="hidden min-h-0 w-full shrink-0 flex-col gap-16pxr overflow-y-auto bg-surface-muted/50 px-24pxr py-28pxr [-ms-overflow-style:none] [scrollbar-width:none] lg:flex lg:w-[min(100%,520px)] lg:min-w-400pxr xl:min-w-460pxr [&::-webkit-scrollbar]:hidden">
      <p className="fonts-overline text-[11px] tracking-wide">관련 기업</p>
      <div className="cursor-pointer rounded-hero border border-surface-border bg-surface-white p-20pxr shadow-hero-card transition-colors hover:bg-primary-light/40">
        <p className="text-[17px] font-bold leading-snug text-text-primary">{reel.company.name}</p>
        <p className="fonts-bodySmall mt-8pxr text-text-secondary">{reel.company.sub}</p>
        <p
          className={`fonts-subTitle mt-10pxr ${reel.company.changePositive ? 'text-semantic-teal' : 'text-semantic-red'}`}>
          {reel.company.changePositive ? '▲' : '▼'} {reel.company.change}
        </p>
      </div>

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

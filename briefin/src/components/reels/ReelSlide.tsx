import HighlightTitle from '@/components/reels/HighlightTitle';
import type { ReelNews } from '@/types/reelNews';

export interface ReelSlideProps {
  reel: ReelNews;
  index: number;
  activeIndex: number;
  isActive: boolean;
  progress: number;
}

export default function ReelSlide({ reel: r, index, activeIndex, isActive, progress }: ReelSlideProps) {
  return (
    <div
      className="relative h-full w-full min-w-full shrink-0 snap-start overflow-hidden bg-gradient-to-b from-primary-light/70 to-surface-white"
      style={{ scrollSnapAlign: 'start' }}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-bg/40 to-transparent" />

      <div
        className="pointer-events-none absolute -right-60pxr -top-60pxr h-340pxr w-340pxr rounded-full opacity-[0.14]"
        style={{
          background: `radial-gradient(circle, ${r.glowColor}, transparent)`,
          filter: 'blur(80px)',
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center pb-76pxr pl-72pxr pr-120pxr pt-20pxr sm:pl-80pxr sm:pr-128pxr">
        <div className="w-full max-w-2xl">
          {isActive && (
            <>
              <div className="mb-12pxr flex flex-wrap items-center gap-8pxr">
                {r.badge && (
                  <span className="fonts-micro flex items-center gap-1 rounded-[5px] bg-semantic-red px-8pxr py-2pxr text-white">
                    <span className="w-5px h-5pxr animate-pulse rounded-full bg-white" />
                    {r.badge}
                  </span>
                )}
                <span className="fonts-micro rounded-[5px] bg-primary-light px-8pxr py-2pxr text-primary">요약</span>
                <span className="fonts-caption text-text-secondary">{r.source}</span>
                <span className="fonts-caption text-text-muted">{r.time}</span>
              </div>

              <h2 className="fonts-heading3 mb-18pxr leading-[1.35] text-text-primary">
                <HighlightTitle title={r.title} highlight={r.highlight} />
              </h2>

              <div className="mb-18pxr flex flex-col gap-10pxr">
                {r.summaryLines.map((line, li) => (
                  <div key={li} className="fonts-bodySmall flex items-start gap-10pxr text-text-secondary">
                    <div className="mt-2pxr flex h-15pxr w-15pxr shrink-0 items-center justify-center rounded-full border border-primary bg-primary-light text-[9px] font-black text-primary">
                      ✓
                    </div>
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              <div className="mb-20pxr flex flex-wrap gap-6pxr">
                {r.tags.map((tag, ti) => (
                  <span
                    key={tag}
                    className={`fonts-micro rounded-full border px-10pxr py-4pxr ${
                      ti === 0
                        ? 'border-primary/25 bg-primary-light text-primary'
                        : 'border-surface-border bg-surface-muted text-text-secondary'
                    }`}>
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}

          {!isActive && (
            <div className="pointer-events-none opacity-50">
              <p className="fonts-heading3 line-clamp-2 text-text-primary">{r.title}</p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2pxr bg-surface-border">
        <div
          className="h-full bg-primary"
          style={{
            width: isActive ? `${progress}%` : index < activeIndex ? '100%' : '0%',
            transition: isActive ? 'none' : undefined,
          }}
        />
      </div>
    </div>
  );
}

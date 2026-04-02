import Image from 'next/image';
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
      className="relative h-full w-full min-w-full shrink-0 snap-start overflow-hidden bg-[#0d1117]"
      style={{ scrollSnapAlign: 'start' }}>

      {/* 배경: 썸네일 or glow */}
      {r.thumbnailUrl ? (
        <>
          <Image
            src={r.thumbnailUrl}
            alt={r.title}
            fill
            className="object-cover transition-transform duration-700"
            unoptimized
            priority={isActive}
          />
          {/* 다크 그라데이션 오버레이 — 글씨 가독성 */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
        </>
      ) : (
        <div
          className="pointer-events-none absolute -right-80pxr -top-80pxr h-400pxr w-400pxr rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, ${r.glowColor}, transparent)`,
            filter: 'blur(120px)',
          }}
        />
      )}

      <div className="absolute inset-0 flex flex-col justify-end pb-60pxr pl-72pxr pr-120pxr pt-24pxr sm:pl-80pxr sm:pr-128pxr">
        <div className="w-full max-w-2xl">
          {isActive && (
            <>
              {/* 카테고리 + 출처 */}
              <div className="mb-14pxr flex flex-wrap items-center gap-8pxr">
                {r.badge && (
                  <span className="flex items-center gap-4pxr rounded-md bg-red-500/80 px-8pxr py-3pxr text-[11px] font-bold text-white">
                    <span className="h-5pxr w-5pxr animate-pulse rounded-full bg-white" />
                    {r.badge}
                  </span>
                )}
                {r.category && (
                  <span className="rounded-md bg-white/15 px-8pxr py-3pxr text-[11px] font-semibold text-white/80 backdrop-blur-sm">
                    {r.category}
                  </span>
                )}
                <span className="text-[12px] text-white/50">{r.source}</span>
                <span className="text-[12px] text-white/30">{r.time}</span>
              </div>

              {/* 제목 */}
              <h2 className="mb-18pxr text-[22px] font-bold leading-[1.3] text-white drop-shadow-md sm:text-[26px]">
                <HighlightTitle title={r.title} highlight={r.highlight} />
              </h2>

              {/* 요약 */}
              <div className="mb-18pxr flex flex-col gap-10pxr">
                {r.summaryLines.map((line, li) => (
                  <div key={li} className="flex items-start gap-10pxr text-[13px] leading-relaxed text-white/75 sm:text-[14px]">
                    <div className="mt-1pxr flex h-16pxr w-16pxr shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-[9px] font-black text-white/70 backdrop-blur-sm">
                      ✓
                    </div>
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              {/* 태그 */}
              {r.tags.length > 0 && (
                <div className="flex flex-wrap gap-6pxr">
                  {r.tags.map((tag, ti) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-10pxr py-4pxr text-[11px] font-medium backdrop-blur-sm ${
                        ti === 0
                          ? 'border-white/25 bg-white/15 text-white/90'
                          : 'border-white/10 bg-black/20 text-white/45'
                      }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}

          {!isActive && (
            <div className="pointer-events-none opacity-30">
              <p className="text-[20px] font-bold leading-snug text-white line-clamp-2 drop-shadow-md">{r.title}</p>
            </div>
          )}
        </div>
      </div>

      {/* 프로그레스 바 */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div
          className="h-full bg-white/60"
          style={{
            width: isActive ? `${progress}%` : index < activeIndex ? '100%' : '0%',
            transition: isActive ? 'none' : undefined,
          }}
        />
      </div>
    </div>
  );
}

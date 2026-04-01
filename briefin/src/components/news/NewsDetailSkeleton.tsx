export default function NewsDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-surface-bg py-36pxr">
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        {/* 메인 기사 카드 */}
        <article className="min-w-0 flex-1 rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
          {/* 카테고리 + 날짜 */}
          <div className="mb-14pxr flex items-center gap-8pxr">
            <div className="h-20pxr w-40pxr rounded-badge bg-gray-200" />
            <div className="h-14pxr w-64pxr rounded bg-gray-200" />
          </div>

          {/* 제목 */}
          <div className="mb-24pxr flex flex-col gap-10pxr">
            <div className="h-7 w-full rounded bg-gray-200" />
            <div className="h-7 w-3/4 rounded bg-gray-200" />
          </div>

          {/* 요약 블록 */}
          <div className="mb-24pxr rounded-summary border border-surface-border p-16pxr">
            <div className="mb-12pxr h-4 w-16 rounded bg-gray-200" />
            <div className="flex flex-col gap-10pxr">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${[100, 85, 70][i - 1]}%` }} />
              ))}
            </div>
          </div>

          {/* 본문 */}
          <div className="flex flex-col gap-14pxr">
            {[100, 90, 80, 95, 75].map((w, i) => (
              <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${w}%` }} />
            ))}
          </div>
        </article>

        {/* 사이드바 */}
        <div className="flex w-full flex-col gap-16pxr lg:w-[320px] lg:shrink-0">
          {/* 타임라인 카드 */}
          <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
            <div className="mb-16pxr h-5 w-20 rounded bg-gray-200" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-12pxr h-4 rounded bg-gray-200" style={{ width: `${[80, 90, 70][i - 1]}%` }} />
            ))}
          </div>

          {/* 관련 뉴스 카드 */}
          <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
            <div className="mb-16pxr h-5 w-24 rounded bg-gray-200" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-12pxr h-4 rounded bg-gray-200" style={{ width: `${[100, 85, 90][i - 1]}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

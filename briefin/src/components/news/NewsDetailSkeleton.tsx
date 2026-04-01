export default function NewsDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-surface-bg py-36pxr">
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        {/* 메인 기사 카드 */}
        <article className="min-w-0 flex-1 rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
          {/* 카테고리 + 날짜 */}
          <div className="mb-12pxr flex items-center gap-8pxr">
            <div className="h-20pxr w-48pxr rounded-badge bg-gray-200" />
            <div className="h-16pxr w-80pxr rounded bg-gray-200" />
          </div>

          {/* 제목 */}
          <div className="mb-20pxr flex flex-col gap-10pxr">
            <div className="h-7 w-full rounded bg-gray-200" />
            <div className="h-7 w-4/5 rounded bg-gray-200" />
          </div>

          {/* 출처 */}
          <div className="mb-20pxr h-4 w-24 rounded bg-gray-200" />

          {/* 요약 블록 */}
          <div className="mb-20pxr flex flex-col gap-10pxr rounded-summary border border-surface-border p-16pxr">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-8pxr">
                <div className="mt-1 h-14pxr w-14pxr shrink-0 rounded-full bg-gray-200" />
                <div className="flex flex-1 flex-col gap-6pxr">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  {i !== 3 && <div className="h-4 w-3/4 rounded bg-gray-200" />}
                </div>
              </div>
            ))}
          </div>

          {/* 썸네일 */}
          <div className="mb-20pxr h-240pxr w-full rounded-md bg-gray-200" />

          {/* 본문 */}
          <div className="flex flex-col gap-12pxr">
            {[100, 80, 90, 60, 85, 70].map((w, i) => (
              <div key={i} className={`h-4 rounded bg-gray-200`} style={{ width: `${w}%` }} />
            ))}
          </div>
        </article>

        {/* 사이드바 */}
        <div className="flex w-full flex-col gap-16pxr lg:w-[320px] lg:shrink-0">
          {/* 타임라인 카드 */}
          <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
            <div className="mb-16pxr h-5 w-20 rounded bg-gray-200" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-14pxr flex flex-col gap-6pxr">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* 관련 뉴스 카드 */}
          <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
            <div className="mb-16pxr h-5 w-24 rounded bg-gray-200" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-14pxr flex flex-col gap-6pxr">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

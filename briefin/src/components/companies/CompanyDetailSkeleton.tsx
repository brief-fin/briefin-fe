export default function CompanyDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-surface-bg py-36pxr">
      {/* CompanyHero 스켈레톤 */}
      <div
        className="mt-14pxr rounded-hero px-24pxr py-16pxr sm:mt-18pxr md:mt-20pxr md:px-56pxr md:py-36pxr"
        style={{ background: 'linear-gradient(135deg, #FDFBF7 0%, #EFF6FF 100%)' }}>
        <div className="flex items-start justify-between gap-16pxr">
          {/* 로고 + 기업명 */}
          <div className="min-w-0">
            <div className="h-44pxr w-44pxr rounded-full bg-gray-200 md:h-56pxr md:w-56pxr" />
            <div className="mt-10pxr h-7 w-40 rounded bg-gray-200 md:mt-14pxr md:h-9 md:w-56" />
            <div className="mt-4pxr h-4 w-24 rounded bg-gray-200" />
          </div>

          {/* 별 + 스탯 칩 */}
          <div className="flex shrink-0 flex-col items-end gap-12pxr md:gap-16pxr">
            <div className="h-7 w-7 rounded bg-gray-200" />
            <div className="flex flex-col gap-8pxr md:flex-row md:gap-12pxr">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-summary bg-surface-white px-12pxr py-10pxr shadow-stat-chip md:px-20pxr md:py-14pxr">
                  <div className="h-3 w-12 rounded bg-gray-200" />
                  <div className="mt-4pxr h-5 w-16 rounded bg-gray-200 md:mt-8pxr md:h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 탭 스켈레톤 */}
      <div className="mt-20pxr flex gap-8pxr">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-gray-200" />
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        {/* 뉴스 카드 목록 */}
        <div className="flex min-w-0 flex-1 flex-col gap-14pxr">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-20pxr rounded-card border border-surface-border bg-surface-white px-24pxr py-22pxr">
              <div className="flex flex-1 flex-col gap-10pxr">
                <div className="flex gap-6pxr">
                  <div className="h-18pxr w-40pxr rounded-badge bg-gray-200" />
                  <div className="h-18pxr w-28pxr rounded-badge bg-gray-200" />
                </div>
                <div className="flex flex-col gap-6pxr">
                  <div className="h-5 w-full rounded bg-gray-200" />
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                </div>
                <div className="mt-auto h-3 w-32 rounded bg-gray-200" />
              </div>
              <div className="h-100pxr w-160pxr shrink-0 self-start rounded-md bg-gray-200" />
            </div>
          ))}
        </div>

        {/* 사이드바 */}
        <div className="flex w-full flex-col gap-14pxr lg:w-96">
          {/* 알림 배너 */}
          <div className="h-80pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr shadow-hero-card">
            <div className="mb-8pxr h-4 w-36 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-200" />
          </div>

          {/* 타임라인 */}
          <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
            <div className="mb-16pxr h-5 w-20 rounded bg-gray-200" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-14pxr flex flex-col gap-6pxr">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DisclosureDetailLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-surface-bg py-36pxr">
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        {/* 메인 카드 */}
        <div className="flex min-w-0 flex-1 flex-col gap-14pxr">
          <article className="rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
            {/* 헤더: 회사명 + 카테고리 배지 */}
            <div className="mb-12pxr flex items-start justify-between gap-12pxr">
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="h-20pxr w-20 shrink-0 rounded-pill bg-gray-200" />
            </div>

            {/* 공시 제목 */}
            <div className="mb-10pxr flex flex-col gap-8pxr">
              <div className="h-5 w-full rounded bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-200" />
            </div>

            {/* 날짜 */}
            <div className="mb-24pxr h-3 w-40 rounded bg-gray-200" />

            {/* 투자 분석 */}
            <div className="mt-24pxr">
              <div className="flex items-center justify-between rounded-t-summary border-x border-t border-gray-200 bg-gray-100 px-20pxr py-14pxr">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-20pxr w-12 rounded-pill bg-gray-200" />
              </div>
              <div className="rounded-b-summary border-x border-b border-gray-200 bg-gray-100 px-20pxr py-18pxr">
                <div className="flex flex-col gap-8pxr">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                  <div className="h-4 w-4/6 rounded bg-gray-200" />
                </div>
              </div>
            </div>

            {/* 핵심 포인트 */}
            <div className="mt-24pxr">
              <div className="mb-14pxr h-4 w-24 rounded bg-gray-200" />
              <div className="space-y-8pxr">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex gap-12pxr rounded-card border border-surface-border bg-surface-white px-16pxr py-14pxr shadow-hero-card">
                    <div className="mt-1pxr h-14pxr w-14pxr shrink-0 rounded-full bg-gray-200" />
                    <div className="flex flex-1 flex-col gap-6pxr">
                      <div className="h-4 w-full rounded bg-gray-200" />
                      <div className="h-4 w-4/5 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 상세 내용 */}
            <div className="mt-24pxr">
              <div className="mb-14pxr h-4 w-20 rounded bg-gray-200" />
              <div className="rounded-summary bg-surface-bg px-20pxr py-20pxr">
                <div className="flex flex-col gap-10pxr">
                  {[100, 85, 92, 70, 88, 60, 78].map((w, i) => (
                    <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* 사이드바 */}
        <aside className="flex w-full flex-col gap-14pxr lg:w-96 lg:shrink-0">
          <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
            <div className="mb-16pxr h-5 w-32 rounded bg-gray-200" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-14pxr flex flex-col gap-6pxr border-b border-surface-border pb-14pxr last:border-0 last:pb-0">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

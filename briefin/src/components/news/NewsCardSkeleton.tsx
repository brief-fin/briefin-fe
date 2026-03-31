export default function NewsCardSkeleton() {
  return (
    <div className="flex max-w-1028pxr animate-pulse gap-20pxr rounded-card border border-surface-border bg-white px-24pxr py-22pxr">
      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col gap-10pxr">
        {/* 태그 */}
        <div className="flex gap-6pxr">
          <div className="h-18pxr w-40pxr rounded-badge bg-gray-200" />
          <div className="h-18pxr w-28pxr rounded-badge bg-gray-200" />
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-6pxr">
          <div className="h-5 w-full rounded bg-gray-200" />
          <div className="h-5 w-3/4 rounded bg-gray-200" />
        </div>

        {/* 바이라인 */}
        <div className="mt-auto h-3 w-32 rounded bg-gray-200" />
      </div>

      {/* 썸네일 */}
      <div className="h-100pxr w-160pxr shrink-0 self-start rounded-md bg-gray-200" />
    </div>
  );
}

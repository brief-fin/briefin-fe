export default function NewsCardSkeleton() {
  return (
    <div className="flex max-w-1028pxr animate-pulse flex-col gap-14pxr rounded-card border border-surface-border bg-white px-25pxr py-28pxr">
      {/* 언론사 + 시간 */}
      <div className="flex items-center gap-6pxr">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-3 w-12 rounded bg-gray-200" />
      </div>

      {/* 제목 */}
      <div className="h-5 w-3/4 rounded bg-gray-200" />

      {/* 요약 */}
      <div className="h-20 rounded-summary bg-gray-200" />
    </div>
  );
}

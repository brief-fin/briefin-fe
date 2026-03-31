export default function DisclosureCardSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-14pxr rounded-card border border-surface-border bg-white px-25pxr py-28pxr">
      <div className="h-3 w-28 rounded bg-gray-200" />
      <div className="h-5 w-3/4 rounded bg-gray-200" />
      <div className="h-5 w-1/2 rounded bg-gray-200" />
    </div>
  );
}

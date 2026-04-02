export default function NewsHistoryBanner() {
  return (
    <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
      {/* 아이콘 영역 */}
      <div className="mb-14pxr flex h-40pxr w-40pxr items-center justify-center rounded-full bg-primary/10">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="3" fill="none" stroke="#3B82F6" strokeWidth="1.8" />
          <line x1="10" y1="2" x2="10" y2="5.5" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="10" y1="14.5" x2="10" y2="18" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="2" y1="10" x2="5.5" y2="10" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="14.5" y1="10" x2="18" y2="10" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* 텍스트 */}
      <p className="text-[14px] font-bold text-text-primary">이벤트 히스토리</p>
      <p className="mt-6pxr text-[12px] leading-relaxed text-text-muted">
        뉴스를 클릭하면 해당 이벤트의 전체 흐름을 한눈에 확인할 수 있어요.
      </p>
    </div>
  );
}

import Link from 'next/link';

export default function FeedWatchlistBanner() {
  return (
    <div className="rounded-card border border-surface-border bg-surface-white p-20pxr shadow-hero-card">
      <div className="mb-14pxr flex h-40pxr w-40pxr items-center justify-center rounded-full bg-primary/10">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8" stroke="#3B82F6" strokeWidth="1.8" />
          <line x1="10" y1="6" x2="10" y2="14" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="6" y1="10" x2="14" y2="10" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      <p className="text-[14px] font-bold text-text-primary">관심 기업 추가하기</p>
      <p className="mt-6pxr text-[12px] leading-relaxed text-text-muted">
        관심 기업을 등록하면 맞춤 뉴스를 피드에서 바로 받아볼 수 있어요.
      </p>

      <Link
        href="/onboarding"
        className="mt-14pxr flex items-center justify-center rounded-button bg-primary px-16pxr py-8pxr text-[12px] font-semibold text-white transition-opacity hover:opacity-80"
      >
        기업 추가하기
      </Link>
    </div>
  );
}

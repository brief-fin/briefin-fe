import Link from 'next/link';

export default function DisclosureAlertFab() {
  return (
    <Link
      href="/mypage?tab=watchlist"
      className="fixed bottom-36pxr right-36pxr z-50 flex items-center gap-8pxr rounded-pill px-20pxr py-14pxr text-[14px] font-bold text-white shadow-modal transition-opacity hover:opacity-90"
      style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      공시 알림 받기
    </Link>
  );
}

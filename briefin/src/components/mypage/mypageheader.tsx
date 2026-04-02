interface MyPageHeaderProps {
  email?: string;
  watchlistCount?: number;
  scrapCount?: number;
  recentCount?: number;
}

export default function MyPageHeader({
  email = '',
  watchlistCount,
  scrapCount,
  recentCount,
}: MyPageHeaderProps) {
  const initial = email ? email[0].toUpperCase() : '?';

  const stats = [
    { label: '관심 기업', value: watchlistCount },
    { label: '스크랩', value: scrapCount },
    { label: '최근 뉴스', value: recentCount },
  ];

  return (
    <div className="mb-24pxr overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-24pxr sm:p-32pxr">
      <div className="flex items-center gap-16pxr">
        {/* 아바타 */}
        <div className="flex h-56pxr w-56pxr shrink-0 items-center justify-center rounded-full bg-white/20 text-[22px] font-bold text-white">
          {initial}
        </div>

        {/* 이메일 */}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/60">My Account</p>
          <p className="mt-2pxr truncate text-[15px] font-bold text-white">{email || '로그인 필요'}</p>
        </div>
      </div>

      {/* 통계 */}
      {(watchlistCount !== undefined || scrapCount !== undefined || recentCount !== undefined) && (
        <div className="mt-20pxr flex gap-0 divide-x divide-white/20 rounded-xl bg-white/10 px-4pxr py-12pxr">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-1 flex-col items-center gap-2pxr">
              <span className="text-[18px] font-bold text-white">
                {s.value ?? '–'}
              </span>
              <span className="text-[11px] text-white/60">{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

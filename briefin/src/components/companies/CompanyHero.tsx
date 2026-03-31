interface StatChip {
  label: string;
  value: string;
  unit?: string;
  isRise?: boolean;
  isFall?: boolean;
}

interface CompanyHeroProps {
  industry: string;
  name: string;
  stats: StatChip[];
  isWatchlisted?: boolean;
  onToggleWatchlist?: () => void;
  logoUrl?: string; // 추가
}

export default function CompanyHero({ industry, name, stats, isWatchlisted = false, onToggleWatchlist, logoUrl }: CompanyHeroProps) {
  return (
    <div
      className="rounded-hero p-16pxr md:px-40pxr md:py-36pxr"
      style={{ background: 'linear-gradient(135deg, #FDFBF7 0%, #EFF6FF 100%)' }}>

      {/* 업종 + 관심 등록 */}
      <div className="flex items-center justify-between gap-8pxr">
        <p className="truncate text-[12px] font-bold text-primary-dark md:text-[14px]">{industry}</p>
        <button
          onClick={onToggleWatchlist}
          className="shrink-0 rounded-button border border-surface-border bg-surface-white px-12pxr py-7pxr text-[12px] font-bold text-text-secondary transition-colors hover:bg-surface-bg md:px-16pxr md:py-10pxr md:text-[14px]">
          {isWatchlisted ? '★ 관심 등록됨' : '☆ 관심 등록'}
        </button>
      </div>

      {/* 로고 + 기업명 */}
      <div className="mt-10pxr flex items-center gap-12pxr md:mt-16pxr">
        {logoUrl && (
          <div className="flex h-48pxr w-48pxr flex-shrink-0 items-center justify-center overflow-hidden rounded-nav bg-surface-white shadow-stat-chip md:h-64pxr md:w-64pxr">
            <img src={logoUrl} alt={name} className="h-full w-full object-contain" />
          </div>
        )}
        <h1 className="text-[22px] font-black tracking-[-0.5px] text-text-primary md:text-[32px] md:tracking-[-1px]">
          {name}
        </h1>
      </div>

      {/* 스탯 칩 */}
      <div className="mt-14pxr flex gap-8pxr md:mt-20pxr md:gap-12pxr">
        {stats.map((stat) => (
          <div key={stat.label} className="flex-1 rounded-summary bg-surface-white px-12pxr py-10pxr shadow-stat-chip md:flex-none md:px-20pxr md:py-14pxr">
            <p className="fonts-micro text-center">{stat.label}</p>
            <p
              className={`mt-4pxr text-center text-[14px] font-black tracking-[-0.5px] md:mt-8pxr md:text-[20px] ${
                stat.isRise ? 'text-semantic-red' : stat.isFall ? 'text-semantic-neutral' : 'text-text-primary'
              }`}>
              {stat.value}
              {stat.unit && <span className="ml-1pxr text-[10px] font-medium md:text-[13px]">{stat.unit}</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
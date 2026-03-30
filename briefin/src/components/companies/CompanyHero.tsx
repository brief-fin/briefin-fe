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
}

export default function CompanyHero({ industry, name, stats, isWatchlisted = false, onToggleWatchlist }: CompanyHeroProps) {
  return (
    <div
      className="rounded-hero p-16pxr md:px-40pxr md:py-36pxr"
      style={{ background: 'linear-gradient(135deg, #F5F0E8 0%, #E0D8C8 100%)' }}>

      {/* 업종 + 관심 등록 */}
      <div className="flex items-center justify-between gap-8pxr">
        <p className="truncate text-[12px] font-bold text-primary-dark md:text-[14px]">{industry}</p>
        <button
          onClick={onToggleWatchlist}
          className="shrink-0 rounded-button border border-surface-border bg-surface-white px-12pxr py-7pxr text-[12px] font-bold text-text-secondary transition-colors hover:bg-surface-bg md:px-16pxr md:py-10pxr md:text-[14px]">
          {isWatchlisted ? '★ 관심 등록됨' : '☆ 관심 등록'}
        </button>
      </div>

      {/* 기업명 */}
      <h1 className="mt-10pxr text-[22px] font-black tracking-[-0.5px] text-text-primary md:mt-16pxr md:text-[32px] md:tracking-[-1px]">
        {name}
      </h1>

      {/* 스탯 칩 — 모바일: 균등 분배 / 데스크톱: 컨텐츠 자연 너비 */}
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

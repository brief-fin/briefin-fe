import { DisclosureInvestmentAnalysisProps } from '@/types/disclosure';

const sentimentConfig = {
  호재: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-800',
    text: 'text-text-secondary',
  },
  악재: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-800',
    text: 'text-text-secondary',
  },
  중립: {
    bg: 'bg-gray-100',
    border: 'border-gray-200',
    badgeBg: 'bg-gray-200',
    badgeText: 'text-gray-700',
    text: 'text-text-secondary',
  },
};

export default function DisclosureInvestmentAnalysis({
  sentiment,
  investmentAnalysis,
}: DisclosureInvestmentAnalysisProps) {
  const safeSentiment = sentiment in sentimentConfig ? sentiment : '중립';
  const cfg = sentimentConfig[safeSentiment];

  return (
    <div className="mt-24pxr">
      <div className={`flex items-center justify-between rounded-t-summary border-x border-t px-20pxr py-14pxr ${cfg.bg} ${cfg.border}`}>
        <h2 className="fonts-label font-bold text-text-primary">투자 분석</h2>
        <span className={`rounded-pill px-12pxr py-4pxr text-[13px] font-black ${cfg.badgeBg} ${cfg.badgeText}`}>
          {safeSentiment}
        </span>
      </div>
      <div className={`rounded-b-summary border-x border-b px-20pxr py-18pxr ${cfg.bg} ${cfg.border}`}>
        <p className={`fonts-body whitespace-pre-line leading-[1.8] ${cfg.text}`}>{investmentAnalysis}</p>
      </div>
    </div>
  );
}

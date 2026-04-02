import type { FeedItem } from '@/api/feedApi';
import type { ReelsItem } from '@/api/reelsApi';
import type { CompanyDetail } from '@/types/company';
import type { Company as PopularCompany } from '@/types/common';
import type { WatchlistCompany } from '@/types/mypage';
import type { NewsItem, NewsListItem } from '@/types/news';
import type { ReelNews } from '@/types/reelNews';

const COMPANY_EMOJIS = ['🏢', '📈', '💼', '🌐', '💡', '🏭'];
const COMPANY_BG_COLORS = [
  'bg-primary-light',
  'bg-[#EAF7F0]',
  'bg-[#FFF3E8]',
  'bg-[#EEF2FF]',
  'bg-[#FCEEF5]',
  'bg-[#F3F4F6]',
];

function pickVisual(index: number) {
  return {
    emoji: COMPANY_EMOJIS[index % COMPANY_EMOJIS.length],
    bgColor: COMPANY_BG_COLORS[index % COMPANY_BG_COLORS.length],
  };
}

function formatSignedPercent(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function mapCompanyDetailToCard(company: CompanyDetail, index = 0): PopularCompany {
  const visual = pickVisual(index);
  return {
    id: company.id,
    name: company.name,
    sector: company.sector,
    emoji: visual.emoji,
    bgColor: visual.bgColor,
    change: formatSignedPercent(company.changeRate),
    isRise: company.changeRate >= 0,
  };
}

export function mapWatchlistToPopularCompany(company: WatchlistCompany, index = 0): PopularCompany {
  const visual = pickVisual(index);
  return {
    id: company.companyId,
    name: company.companyName ?? '',
    sector: company.ticker,
    emoji: visual.emoji,
    bgColor: visual.bgColor,
    change: '',
    isRise: true,
  };
}

export function mapNewsItem(item: NewsListItem | FeedItem): NewsItem {
  return {
    id: String(item.newsId),
    source: item.press,
    time: item.publishedAt,
    title: item.title,
    summary: item.summary ? [item.summary] : [],
    categories: item.category ? [item.category] : [],
    companies: item.relatedCompanies ?? [],
  };
}

export function mapReelsItem(item: ReelsItem, index: number): ReelNews {
  const primaryCompany = item.relatedCompanies[0] ?? '관련 기업';
  return {
    id: String(item.newsId),
    badge: null,
    category: item.category,
    source: item.press,
    time: item.publishedAt,
    title: item.title,
    highlight: primaryCompany,
    summaryLines: item.summary ? [item.summary] : [],
    tags: [item.category, ...item.relatedCompanies].filter(Boolean),
    thumbnailUrl: item.thumbnailUrl ?? null,
    glowColor: index % 2 === 0 ? '#C66B2F' : '#275EFE',
    company: {
      name: primaryCompany,
      sub: item.relatedCompanies.slice(1).join(', ') || item.category,
      change: '관련 뉴스',
      changePositive: true,
    },
    relatedNews: item.relatedCompanies.map((companyName) => ({
      title: `${companyName} 관련 기사`,
      source: item.press,
      time: item.publishedAt,
    })),
  };
}

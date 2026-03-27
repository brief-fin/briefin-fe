import { NewsItem } from '@/types/news';
import { Company } from '@/components/common/PopularCompanyList';

export const MOCK_FEED_NEWS: NewsItem[] = [
  {
    id: 'feed-1',
    source: '삼성전자',
    time: '3시간 전',
    title: '삼성전자, 북미 데이터센터와 NVMe SSD 공급 계약 체결',
    summary: ['향후 2년간 안정적인 매출처 확보', '고부가가치 제품군 확대로 수익성 개선 기대'],
    categories: ['관심기업'],
    companies: [],
  },
  {
    id: 'feed-2',
    source: '현대차',
    time: '5시간 전',
    title: '현대차, 자율주행 소프트웨어 업데이트 발표',
    categories: ['관심기업'],
    companies: [],
  },
];

export const MOCK_WATCHLIST: Company[] = [
  { id: 1, name: '삼성전자', sector: '반도체 · 전자', change: '+1.3%', isRise: true, emoji: '📱', bgColor: 'bg-[#EFF6FF]' },
  { id: 2, name: '현대자동차', sector: '자동차', change: '+0.8%', isRise: true, emoji: '🚗', bgColor: 'bg-[#DBEAFE]' },
];

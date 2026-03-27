import { NewsItem } from '@/types/news';

export interface CompanyInfo {
  industry: string;
  name: string;
  stats: {
    label: string;
    value: string;
    unit?: string;
    isRise?: boolean;
    isFall?: boolean;
  }[];
}


export interface RelatedCompany {
  id: number;
  name: string;
  sector: string;
  change: string;
  isRise: boolean;
  emoji: string;
  bgColor: string;
}

export const MOCK_COMPANY: CompanyInfo = {
  industry: '반도체 및 전자제품 제조',
  name: '삼성전자',
  stats: [
    { label: '현재가', value: '62,400', unit: '원' },
    { label: '등락률', value: '+1.3%', isRise: true },
    { label: '시가총액', value: '372조' },
  ],
};

export const MOCK_NEWS: NewsItem[] = [
  { id: 'company-news-1', source: '로이터', time: '오전 10:30', title: '삼성전자, 북미 최대 데이터센터와 NVMe SSD 공급 계약 체결', categories: ['관심기업'], companies: ['삼성전자'] },
  { id: 'company-news-2', source: '한국경제', time: '2026.01.15', title: '삼성전자, CES 2026서 차세대 OLED 패널 공개', categories: ['관심기업'], companies: ['삼성전자'] },
];

export const MOCK_RELATED_COMPANIES: RelatedCompany[] = [
  { id: 1, name: 'SK하이닉스', sector: '반도체', change: '-0.4%', isRise: false, emoji: '💾', bgColor: 'bg-[#DBEAFE]' },
  { id: 2, name: '삼성SDI', sector: '배터리', change: '+0.6%', isRise: true, emoji: '🔵', bgColor: 'bg-[#EFF6FF]' },
];

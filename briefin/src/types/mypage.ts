export type MyPageTab = '관심 기업' | '스크랩 뉴스' | '최근 본 뉴스' | '계정 관리';

// API 응답 타입
export interface UserInfo {
  userId: string;
  email: string;
  createdAt: string;
}

export interface ScrapedNews {
  newsId: number;
  title: string;
  summary: string;
  source: string;
  scrapedAt: string;
}

export interface WatchlistCompany {
  companyId: number;
  companyName: string;
  ticker: string;
  logoUrl: string;
  addedAt: string;
}

export interface RecentNews {
  newsId: number;
  title: string;
  summary: string;
  source: string;
  viewedAt: string;
}

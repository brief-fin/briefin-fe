export interface NewsItem {
  id: string;
  source: string; // 언론사
  time: string; // 시간 (예: "오전 10:30")
  isLive?: boolean; // LIVE 뱃지
  title: string;
  summary?: string[]; // 요약 bullet 리스트 (없으면 요약 섹션 미표시)
  categories: string[]; // 카테고리 태그
  companies: string[]; // 관련기업 태그
}

export type NewsDetail = {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  source: string;
  isLive: boolean;
  isScrapped: boolean;
  summaries: string[];
  content: string;
  originalUrl: string;
  relatedCompanies: {
    id: string;
    name: string;
    emoji: string;
  }[];
  relatedNews: {
    id: string;
    title: string;
    source: string;
    publishedAt: string;
  }[];
};
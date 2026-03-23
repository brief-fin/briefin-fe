import { apiClient, type ApiResponse } from './client';

export interface NewsListItem {
  newsId: string;
  title: string;
  summary: string;
  category: string;
  press: string;
  publishedAt: string;
  relatedCompanies: string[];
}

export interface NewsDetailResponse {
  newsId: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  press: string;
  publishedAt: string;
  relatedCompanies: string[];
  relatedNews: string[];
}

export interface ScrapResponse {
  newsId: number;
  isScraped: boolean;
  scrapedAt: string;
}

// 뉴스 목록 조회 (category 없으면 전체)
export const fetchNewsList = (category?: string) => {
  const query = category && category !== 'all' ? `?category=${category}` : '';
  return apiClient
    .get<ApiResponse<NewsListItem[]>>(`/api/news${query}`)
    .then((res) => res.result);
};

// 뉴스 상세 조회
export const fetchNewsDetail = (id: string | number) =>
  apiClient
    .get<ApiResponse<NewsDetailResponse>>(`/api/news/${id}`)
    .then((res) => res.result);

// 뉴스 검색
export const searchNews = (q: string) =>
  apiClient
    .get<ApiResponse<NewsListItem[]>>(`/api/news/search?q=${encodeURIComponent(q)}`)
    .then((res) => res.result);

// 뉴스 스크랩 등록
export const scrapNews = (id: string | number) =>
  apiClient
    .post<ApiResponse<ScrapResponse>>(`/api/news/${id}/scrap`)
    .then((res) => res.result);

// 뉴스 스크랩 취소
export const deleteScrapNews = (id: string | number) =>
  apiClient.delete<ApiResponse<null>>(`/api/news/${id}/scrap`);

// 백엔드 NewsListItem → 프론트 NewsItem 변환
import type { NewsItem } from '@/types/news';

export function toNewsItem(item: NewsListItem): NewsItem {
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

import { apiClient, type ApiResponse } from './client';
import type { NewsListItem, NewsDetailResponse, ScrapResponse, NewsItem } from '@/types/news';

export type { NewsListItem, NewsDetailResponse, ScrapResponse };

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
export function toNewsItem(item: NewsListItem): NewsItem {
  return {
    id: String(item.newsId),
    source: item.press,
    time: item.publishedAt,
    title: item.title,
    summary: item.summary ? item.summary.split('\n').filter(Boolean) : [],
    categories: item.category ? [item.category] : [],
    companies: item.relatedCompanies ?? [],
  };
}

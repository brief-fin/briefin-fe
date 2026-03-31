import { apiClient, type ApiResponse } from './client';
import type { NewsListItem, NewsPageResponse, NewsDetailResponse, ScrapResponse, NewsItem, NewsRelatedItem } from '@/types/news';
import { formatDateTime } from '@/utils/date';

export type { NewsListItem, NewsPageResponse, NewsDetailResponse, ScrapResponse, NewsRelatedItem };

// 뉴스 목록 조회 (페이지네이션)
export const fetchNewsList = (category?: string, page = 0, size = 10) => {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (category && category !== 'all') params.set('category', category);
  return apiClient
    .get<ApiResponse<NewsPageResponse>>(`/api/news?${params.toString()}`)
    .then((res) => res.result);
};

// 뉴스 상세 조회
export const fetchNewsDetail = (id: string | number) =>
  apiClient
    .get<ApiResponse<NewsDetailResponse>>(`/api/news/${id}`)
    .then((res) => res.result);

// 관련 뉴스 조회
export const fetchRelatedNews = (id: string | number) =>
  apiClient
    .get<ApiResponse<NewsRelatedItem[]>>(`/api/news/${id}/related`)
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

// 뉴스 타임라인 조회
export interface NewsTimelineItemResponse {
  newsId: string;
  title: string;
  summary: string;
  category: string;
  press: string;
  thumbnailUrl?: string | null;
  publishedAt: string | null;
  isCurrent: boolean;
}

export const fetchNewsTimeline = (id: string | number) =>
  apiClient
    .get<ApiResponse<NewsTimelineItemResponse[]>>(`/api/news/${id}/timeline`)
    .then((res) => res.result);

// 백엔드 NewsListItem → 프론트 NewsItem 변환
export function toNewsItem(item: NewsListItem): NewsItem {
  return {
    id: String(item.newsId),
    source: item.press,
    time: item.publishedAt ? formatDateTime(item.publishedAt) : '',
    title: item.title,
    summary: item.summary ? item.summary.split('\n').filter(Boolean) : [],
    categories: item.category ? [item.category] : [],
    companies: item.relatedCompanies ?? [],
  };
}

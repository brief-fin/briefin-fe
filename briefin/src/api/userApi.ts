import { apiClient, type ApiResponse } from './client';
import type { UserInfo, ScrapedNews, WatchlistCompany, RecentNews } from '@/types/mypage';

export type { UserInfo, ScrapedNews, WatchlistCompany, RecentNews };

// 내 정보 조회
export const fetchMyInfo = () =>
  apiClient.get<ApiResponse<UserInfo>>('/api/users/me').then((res) => res.result);

// 회원 탈퇴
export const deleteMyAccount = () => apiClient.delete<ApiResponse<unknown>>('/api/users/me');

// 스크랩한 뉴스 목록
export const fetchScrappedNews = (page = 1, size = 10) =>
  apiClient
    .get<ApiResponse<{ scrapList: ScrapedNews[]; totalCount: number }>>(
      `/api/users/scraps?page=${page}&size=${size}`,
    )
    .then((res) => res.result);

// 관심 기업 목록
export const fetchWatchlist = () =>
  apiClient
    .get<ApiResponse<{ watchlist: WatchlistCompany[] }>>('/api/users/watchlist')
    .then((res) => res.result.watchlist);

// 최근 본 뉴스 목록
export const fetchRecentNews = (page = 1, size = 10) =>
  apiClient
    .get<ApiResponse<{ recentList: RecentNews[]; totalCount: number }>>(
      `/api/users/recent?page=${page}&size=${size}`,
    )
    .then((res) => res.result);

// 관심 기업 등록
export const watchCompany = (companyId: number) =>
  apiClient.post(`/api/users/${companyId}/watch`);

// 관심 기업 취소
export const unwatchCompany = (companyId: number) =>
  apiClient.delete(`/api/users/${companyId}/watch`);

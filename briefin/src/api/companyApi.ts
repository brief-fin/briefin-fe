import { authStore } from '@/store/authStore';
import { apiClient, type ApiResponse } from './client';
import type { CompanyDetail } from '@/types/company';
import type { NewsListItem } from '@/types/news';

export type { CompanyDetail };


// 기업 상세 조회
export const fetchCompanyDetail = async (id: number): Promise<CompanyDetail> => {
  const res = await apiClient.get<ApiResponse<CompanyDetail>>(`/companies/${id}`, {
    cache: 'no-store',
  });
  return res.result;
};

// 인기 기업 목록
export const fetchPopularCompanies = () =>
  apiClient.get<ApiResponse<CompanyDetail[]>>('/companies/popular').then((res) => res.result);

// 기업 검색
export const searchCompanies = (q: string, page = 0, size = 10) =>
  apiClient
    .get<ApiResponse<CompanyDetail[]>>(
      `/companies/search?q=${encodeURIComponent(q)}&page=${page}&size=${size}`,
    )
    .then((res) => res.result);

// 기업 관련 뉴스 조회
export const fetchCompanyNews = (id: number, size = 20) =>
  apiClient
    .get<ApiResponse<NewsListItem[]>>(`/companies/${id}/news?size=${size}`)
    .then((res) => res.result);

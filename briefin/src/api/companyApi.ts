import { apiClient, type ApiResponse } from './client';

export interface CompanyDetail {
  id: number;
  name: string;
  ticker: string;
  sector: string;
  logoUrl: string;
  currentPrice: number;
  changeRate: number;
  marketCap: number;
  isOverseas: boolean;
  relatedCompanies: { id: number; name: string; ticker: string }[];
}

// 기업 상세 조회
export const fetchCompanyDetail = (id: number) =>
  apiClient.get<ApiResponse<CompanyDetail>>(`/companies/${id}`).then((res) => res.result);

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

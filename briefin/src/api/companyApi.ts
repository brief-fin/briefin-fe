import { apiClient, type ApiResponse } from './client';
import type { CompanyDetail } from '@/types/company';

export type { CompanyDetail };

export type CompanyPage = {
  content: CompanyDetail[];
  totalElements: number;
};

function normalizeCompanyPage(input: unknown): CompanyPage {
  if (input && typeof input === 'object') {
    const obj = input as Record<string, unknown>;
    const content = Array.isArray(obj.content) ? (obj.content as CompanyDetail[]) : [];
    const totalElements = typeof obj.totalElements === 'number' ? obj.totalElements : content.length;
    return { content, totalElements };
  }
  return { content: [], totalElements: 0 };
}

// 기업 상세 조회
export const fetchCompanyDetail = async (id: number): Promise<CompanyDetail> => {
  const res = await apiClient.get<ApiResponse<CompanyDetail>>(`/companies/${id}`, {
    cache: 'no-store',
  });
  return res.result;
};

// 인기 기업 목록
export const fetchPopularCompanies = () =>
  apiClient.get<ApiResponse<unknown>>('/companies/popular/market-cap').then((res) => {
    // popular은 현재 result가 배열로 내려오므로 여기서 page 형태로 감싼다.
    if (Array.isArray(res.result)) {
      const content = res.result as CompanyDetail[];
      return { content, totalElements: content.length } satisfies CompanyPage;
    }
    return normalizeCompanyPage(res.result);
  });

// 기업 검색
export const searchCompanies = (q: string, page = 0, size = 10) =>
  apiClient
    .get<ApiResponse<unknown>>(`/companies/search?q=${encodeURIComponent(q)}&page=${page}&size=${size}`)
    .then((res) => normalizeCompanyPage(res.result));

// 기업 타임라인
export interface CompanyTimelineItem {
  type: '공시' | '뉴스';
  id: string;
  title: string;
  summary: string | null;
  category: string | null;
  date: string | null;
  sentiment: string | null;
}

export const fetchCompanyTimeline = async (id: number): Promise<CompanyTimelineItem[]> => {
  const res = await apiClient.get<ApiResponse<CompanyTimelineItem[]>>(`/companies/${id}/timeline`);
  return res.result ?? [];
};

import { apiClient, type ApiResponse } from './client';

export interface DisclosureListItem {
  disclosureId: number;
  dartId: string;
  title: string;
  disclosedAt: string;
  companyId: number;
  companyName: string;
  ticker: string;
  summary: string;
}

export interface DisclosureDetailResponse {
  disclosureId: number;
  dartId: string;
  title: string;
  disclosedAt: string;
  url: string;
  companyId: number;
  companyName: string;
  ticker: string;
  summary: string;
  summaryDetail: string;
}

export interface DisclosureListResult {
  content: DisclosureListItem[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

// 공시 목록 조회
export const fetchDisclosureList = (params?: { companyId?: number; page?: number; size?: number }) => {
  const query = new URLSearchParams();
  if (params?.companyId) query.set('companyId', String(params.companyId));
  if (params?.page !== undefined) query.set('page', String(params.page));
  if (params?.size !== undefined) query.set('size', String(params.size));
  const qs = query.toString() ? `?${query.toString()}` : '';
  return apiClient
    .get<ApiResponse<DisclosureListResult>>(`/api/disclosures${qs}`)
    .then((res) => res.result);
};

// 공시 상세 조회
export const fetchDisclosureDetail = (disclosureId: number) =>
  apiClient
    .get<ApiResponse<DisclosureDetailResponse>>(`/api/disclosures/${disclosureId}`)
    .then((res) => res.result);

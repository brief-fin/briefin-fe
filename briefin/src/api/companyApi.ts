import { authStore } from '@/store/authStore';
import { apiClient, type ApiResponse } from './client';
import type { CompanyDetail } from '@/types/company';

export type { CompanyDetail };

// 기업 상세 조회

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export const fetchCompanyDetail = async (id: number): Promise<CompanyDetail> => {
  const token = authStore.getAccessToken();
  console.log(token)
  const res = await fetch(`${BASE_URL}/companies/${id}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const data = await res.json();
  return data.result;
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

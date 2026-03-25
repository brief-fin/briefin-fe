import { useQuery } from '@tanstack/react-query';
import { fetchCompanyDetail, fetchPopularCompanies, searchCompanies } from '@/api/companyApi';

export const companyKeys = {
  all: ['company'] as const,
  detail: (id: number) => ['company', 'detail', id] as const,
  popular: () => ['company', 'popular'] as const,
  search: (q: string) => ['company', 'search', q] as const,
};

// 기업 상세
export function useCompanyDetail(id: number) {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: () => fetchCompanyDetail(id),
    enabled: !!id,
  });
}

// 인기 기업
export function usePopularCompanies() {
  return useQuery({
    queryKey: companyKeys.popular(),
    queryFn: fetchPopularCompanies,
  });
}

// 기업 검색
export function useCompanySearch(q: string) {
  return useQuery({
    queryKey: companyKeys.search(q),
    queryFn: () => searchCompanies(q),
    enabled: q.length > 0,
  });
}

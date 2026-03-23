import { useQuery } from '@tanstack/react-query';
import { fetchDisclosureDetail, fetchDisclosureList } from '@/api/disclosureApi';

export const disclosureKeys = {
  all: ['disclosure'] as const,
  list: (params?: { companyId?: number; page?: number }) =>
    ['disclosure', 'list', params] as const,
  detail: (id: number) => ['disclosure', 'detail', id] as const,
};

// 공시 목록
export function useDisclosureList(params?: { companyId?: number; page?: number; size?: number }) {
  return useQuery({
    queryKey: disclosureKeys.list(params),
    queryFn: () => fetchDisclosureList(params),
  });
}

// 공시 상세
export function useDisclosureDetail(disclosureId: number) {
  return useQuery({
    queryKey: disclosureKeys.detail(disclosureId),
    queryFn: () => fetchDisclosureDetail(disclosureId),
    enabled: !!disclosureId,
  });
}

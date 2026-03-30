import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchMyInfo,
  fetchRecentNews,
  fetchScrappedNews,
  fetchWatchlist,
  unwatchCompany,
  watchCompany,
} from '@/api/userApi';

export const userKeys = {
  me: () => ['user', 'me'] as const,
  scraps: (page: number) => ['user', 'scraps', page] as const,
  watchlist: () => ['user', 'watchlist'] as const,
  recent: (page: number) => ['user', 'recent', page] as const,
};

// 내 정보
export function useMyInfo() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: fetchMyInfo,
  });
}

// 스크랩한 뉴스 목록
export function useScrappedNews(page = 1) {
  return useQuery({
    queryKey: userKeys.scraps(page),
    queryFn: () => fetchScrappedNews(page),
  });
}

// 최근 본 뉴스 목록
export function useRecentNews(page = 1) {
  return useQuery({
    queryKey: userKeys.recent(page),
    queryFn: () => fetchRecentNews(page),
  });
}

// 관심 기업 목록
export function useWatchlist() {
  return useQuery({
    queryKey: userKeys.watchlist(),
    queryFn: fetchWatchlist,
  });
}

// 관심 기업 등록/취소
export function useWatchCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (companyId: number) => watchCompany(companyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.watchlist() }),
  });
}

export function useUnwatchCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (companyId: number) => unwatchCompany(companyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.watchlist() }),
  });
}

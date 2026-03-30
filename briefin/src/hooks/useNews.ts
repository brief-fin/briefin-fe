import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteScrapNews,
  fetchNewsDetail,
  fetchNewsList,
  scrapNews,
  searchNews,
} from '@/api/newsApi';

// 쿼리 키 상수 (오타 방지)
export const newsKeys = {
  all: ['news'] as const,
  list: (category?: string) => ['news', 'list', category ?? 'all'] as const,
  detail: (id: string | number) => ['news', 'detail', id] as const,
  search: (q: string) => ['news', 'search', q] as const,
};

// 뉴스 목록
export function useNewsList(category?: string) {
  return useQuery({
    queryKey: newsKeys.list(category),
    queryFn: () => fetchNewsList(category),
  });
}

// 뉴스 상세
export function useNewsDetail(id: string | number, options?: { enabled?: boolean }) {
  const enabledById = !!id;
  const enabledByOptions = options?.enabled ?? true;
  return useQuery({
    queryKey: newsKeys.detail(id),
    queryFn: () => fetchNewsDetail(id),
    enabled: enabledById && enabledByOptions,
  });
}

// 뉴스 검색
export function useNewsSearch(q: string) {
  return useQuery({
    queryKey: newsKeys.search(q),
    queryFn: () => searchNews(q),
    enabled: q.length > 0,
  });
}

// 스크랩 등록
export function useScrapNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => scrapNews(id),
    onSuccess: (_, id) => {
      // 해당 뉴스 상세 캐시 무효화 → 자동으로 최신 데이터 다시 불러옴
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
    },
  });
}

// 스크랩 취소
export function useDeleteScrapNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteScrapNews(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: newsKeys.detail(id) });
    },
  });
}

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  deleteScrapNews,
  fetchNewsDetail,
  fetchNewsList,
  fetchNewsTimeline,
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

// 뉴스 목록 단순 조회 (홈 등 무한스크롤 불필요한 경우)
export function useNewsPage(category?: string, page = 0, size = 10) {
  return useQuery({
    queryKey: ['news', 'page', category ?? 'all', page, size],
    queryFn: () => fetchNewsList(category, page, size),
  });
}

// 뉴스 목록 (무한스크롤)
export function useNewsList(category?: string) {
  return useInfiniteQuery({
    queryKey: newsKeys.list(category),
    queryFn: ({ pageParam = 0 }) => fetchNewsList(category, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.currentPage + 1 : undefined),
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

// 뉴스 검색 (무한스크롤)
export function useNewsSearch(q: string) {
  return useInfiniteQuery({
    queryKey: newsKeys.search(q),
    queryFn: ({ pageParam = 0 }) => searchNews(q, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.currentPage + 1 : undefined),
    enabled: q.length > 0,
  });
}

// 뉴스 타임라인
export function useNewsTimeline(id: string | number) {
  return useQuery({
    queryKey: ['news', id, 'timeline'],
    queryFn: () => fetchNewsTimeline(id),
    enabled: !!id,
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

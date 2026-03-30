import { useQuery } from '@tanstack/react-query';
import { fetchFeed } from '@/api/feedApi';

export function useFeed(page = 0, size = 20, enabled = true) {
  return useQuery({
    queryKey: ['feed', page, size],
    queryFn: () => fetchFeed(page, size),
    enabled,
  });
}

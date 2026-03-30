import { useQuery } from '@tanstack/react-query';
import { fetchReels } from '@/api/reelsApi';

export function useReels(enabled = true) {
  return useQuery({
    queryKey: ['reels'],
    queryFn: fetchReels,
    enabled,
  });
}

import { useQuery } from '@tanstack/react-query';
import { fetchHomeNews } from '@/api/homeApi';

export function useHomeNews() {
  return useQuery({
    queryKey: ['home', 'news'],
    queryFn: fetchHomeNews,
  });
}

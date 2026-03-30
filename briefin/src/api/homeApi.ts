import { apiClient, type ApiResponse } from './client';
import type { NewsListItem } from '@/types/news';

export interface HomeNewsResponse {
  domesticNews: NewsListItem[];
  foreignNews: NewsListItem[];
}

export const fetchHomeNews = () =>
  apiClient.get<ApiResponse<HomeNewsResponse>>('/api/home').then((res) => res.result);

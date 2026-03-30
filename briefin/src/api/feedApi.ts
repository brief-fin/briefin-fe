import { apiClient } from './client';
import type { NewsListItem } from '@/types/news';

export interface FeedItem extends Omit<NewsListItem, 'region'> {
  thumbnailUrl: string;
}

export const fetchFeed = (page = 0, size = 20) =>
  apiClient.get<FeedItem[]>(`/api/feeds?page=${page}&size=${size}`);

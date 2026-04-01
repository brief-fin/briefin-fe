import { apiClient } from './client';
import type { ReelNews } from '@/types/reelNews';
import { formatDateTime } from '@/utils/date';

export interface ReelsItem {
  newsId: string;
  title: string;
  summary: string;
  category: string;
  press: string;
  publishedAt: string;
  relatedCompanies: string[];
}

const GLOW_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

export function toReelNews(item: ReelsItem, index: number): ReelNews {
  const lines = item.summary ? item.summary.split('\n').filter(Boolean) : [];
  return {
    id: item.newsId,
    badge: null,
    category: item.category ?? '',
    source: item.press ?? '',
    time: item.publishedAt ? formatDateTime(item.publishedAt) : '',
    title: item.title ?? '',
    highlight: lines[0] ?? '',
    summaryLines: lines,
    tags: item.relatedCompanies ?? [],
    glowColor: GLOW_COLORS[index % GLOW_COLORS.length],
    company: {
      name: item.relatedCompanies?.[0] ?? '',
      sub: '',
      change: '',
      changePositive: false,
    },
    relatedNews: [],
  };
}

export const fetchReels = () => apiClient.get<ReelsItem[]>('/api/reels');

export interface NewsTimelineItem {
  id: string;
  date: string;       // e.g. "2025.03.27"
  title: string;
  source: string;
  tag: string;
  isLatest?: boolean;
  newsId?: string;
  publishedAt?: string;
}

export interface NewsTimelineProps {
  items: NewsTimelineItem[];
  loading?: boolean;
}

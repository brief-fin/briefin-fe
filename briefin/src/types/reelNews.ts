export type ReelNewsBadge = 'LIVE' | null;

export interface ReelNewsRelatedItem {
  title: string;
  source: string;
  time: string;
}

export interface ReelNewsCompany {
  name: string;
  sub: string;
  change: string;
  changePositive: boolean;
}

export interface ReelNews {
  id: number;
  badge: ReelNewsBadge;
  category: string;
  source: string;
  time: string;
  title: string;
  highlight: string;
  summaryLines: string[];
  tags: string[];
  glowColor: string;
  company: ReelNewsCompany;
  relatedNews: ReelNewsRelatedItem[];
}

export interface ReelsActionRailProps {
  newsId: number;
  isScrapped: boolean;
  onToggleScrap: () => void;
}

export interface ShareOption {
  label: string;
  icon: string;
  action: () => void;
}

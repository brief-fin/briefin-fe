// ========================
// API Response Types
// ========================

export type DisclosureApiItem = {
  disclosureId: number;
  dartId: string;
  title: string;
  disclosedAt: string;
  companyId: number;
  companyName: string;
  ticker: string;
  summary: string;
  category?: string;
};

export type DisclosureDetailApiItem = {
  disclosureId: number;
  dartId: string;
  title: string;
  disclosedAt: string;
  url: string;
  companyId: number;
  companyName: string;
  ticker: string;
  summary: string;
  summaryDetail: string;
  category?: string;
};

export type DisclosureListResult = {
  content: DisclosureApiItem[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
};

export type DisclosureRecentApiItem = {
  disclosureId: number;
  dartId: string;
  title: string;
  disclosedAt: string;
  summary: string;
  category?: string;
};

// ========================
// View Types
// ========================

export type DisclosureListItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  companyName?: string;
  summaryPoints?: string[];
};

// ========================
// Component Props
// ========================

export interface PageProps {
  params: Promise<{ id: string }>;
}

export interface DisclosureBtnProps {
  url: string;
  documentUrl?: string | null;
}

export interface DisclosureCardProps {
  item: DisclosureListItem;
  sourceLabel?: string;
}

export interface DisclosureHeaderProps {
  data: {
    category: string;
    date: string;
    source?: string;
    title: string;
    companyName?: string;
    reportNumber?: string;
  };
}

export interface DisclosureListProps {
  items: DisclosureListItem[];
  sourceLabel?: string;
}

export interface DisclosureSidebarProps {
  recentDisclosures: DisclosureListItem[];
  companyName?: string;
  companyId: number;
  onAlertClick?: () => void;
}

export interface DisclosureSummaryProps {
  summaryPoints: string[];
}

export interface DisclosureInfiniteListProps {
  initialItems: DisclosureListItem[];
  initialPage: number;
  totalPages: number;
  companyId?: number;
}

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
};

// ========================
// View Types
// ========================

export type DisclosureDetail = {
  id: string;
  title: string;
  category: string;
  date: string;
  source?: string;
  reportNumber?: string;
  companyName?: string;
  companyId: number;
  summaryPoints: string[];
  description: string;
  details: {
    partner: string;
    content: string;
    amount: string;
    period: string;
    ratio: string;
    reportType?: string;
  };
  descriptionAfterTable?: string;
  url: string;
  documentUrl?: string;
  relatedCompanyNames?: string[];
};

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

export interface DisclosureDetailsProps {
  details: DisclosureDetail['details'];
}

export interface DisclosureHeaderProps {
  data: Pick<DisclosureDetail, 'category' | 'date' | 'source' | 'title' | 'companyName' | 'reportNumber'>;
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
  summaryPoints: DisclosureDetail['summaryPoints'];
}

export interface RelatedCompaniesProps {
  relatedCompanyNames: string[];
}

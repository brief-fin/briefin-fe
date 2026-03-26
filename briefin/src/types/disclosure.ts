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

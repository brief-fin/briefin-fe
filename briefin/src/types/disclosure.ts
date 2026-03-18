export type DisclosureDetail = {
  id: string;
  title: string;
  category: string;
  date: string;
  source?: string;
  reportNumber?: string;
  companyName?: string;
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
};

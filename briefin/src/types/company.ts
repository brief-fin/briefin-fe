// API 응답 타입
export interface CompanyDetail {
  id: number;
  name: string;
  ticker: string;
  sector: string;
  logoUrl: string;
  currentPrice: number;
  changeRate: number;
  marketCap: number;
  isOverseas: boolean;
  watchlisted: boolean;
  relatedCompanies: { id: number; name: string; ticker: string }[];
}

export type Company = {
  id: string;
  name: string;
  logo?: string;
  ticker?: string;
  logoUrl?: string;
  industry: string;
  logoBg?: string;
};

export type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

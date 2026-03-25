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
  relatedCompanies: { id: number; name: string; ticker: string }[];
}

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  /** 로고 원형 배경 Tailwind 클래스 (선택) */
  logoBg?: string;
};

export type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

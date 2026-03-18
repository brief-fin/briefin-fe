export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  /** 로고 원형 배경 Tailwind 클래스 (선택) */
  logoBg?: string;
};

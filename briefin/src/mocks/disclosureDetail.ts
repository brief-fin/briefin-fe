import type { DisclosureDetail, DisclosureListItem } from '@/types/disclosure';

export const MOCK_DISCLOSURE_DETAIL: DisclosureDetail = {
  id: '2026-03-00412',
  title: '주요사항보고서 (공급계약 체결)',
  category: '공급계약',
  date: '2026.03.13 오전 09:05',
  source: '금융감독원 전자공시',
  reportNumber: '2026-03-00412',
  companyName: '삼성전자 주식회사',
  summaryPoints: [
    '북미 최대 데이터센터 운영사와 NVMe SSD 대규모 공급 계약 체결',
    '계약 기간 2년, 총 계약 금액 약 1조 2,400억 원 규모',
    '고부가가치 엔터프라이즈 SSD 제품군 중심 공급, 수익성 개선 기대',
  ],
  description:
    '당사는 2026년 3월 13일 북미 소재 데이터센터 운영사와 NVMe SSD 공급에 관한 계약을 체결하였기에 아래와 같이 공시합니다.',
  details: {
    partner: '북미 데이터센터 운영사 (비공개)',
    content: 'NVMe SSD 제품 공급',
    amount: '1,240,000,000,000원 (약 1조 2,400억)',
    period: '2026.03.13 ~ 2028.03.12 (2년)',
    ratio: '약 3.2% (2024년 연결 매출 기준)',
    reportType: '주요사항보고서',
  },
  descriptionAfterTable:
    '본 계약은 당사의 엔터프라이즈 SSD 사업 확대 전략의 일환으로, 고부가가치 제품군 중심의 B2B 공급 채널을 강화하기 위한 목적으로 체결되었습니다. 계약 상대방의 요청에 따라 구체적인 사명은 비공개로 처리됩니다.',
  url: 'https://dart.fss.or.kr',
  documentUrl: 'https://dart.fss.or.kr/dsaf001/main.do',
  relatedCompanyNames: ['삼성전자'],
};

export const MOCK_RECENT_DISCLOSURES: DisclosureListItem[] = [
  {
    id: '1',
    title: '연결재무제표 기준 영업(잠정)실적 공시',
    date: '2026.02.28',
    category: 'DART 공시',
  },
  {
    id: '2',
    title: '사업보고서 (제56기)',
    date: '2026.01.30',
    category: 'DART 공시',
  },
  {
    id: '3',
    title: '배당결정 공시 – 보통주 1주당 500원',
    date: '2026.01.20',
    category: 'DART 공시',
  },
];

/** 기업 상세 공시 탭용 목록 (Figma 순서·배지 반영) */
export const MOCK_COMPANY_DISCLOSURES: DisclosureListItem[] = [
  {
    id: '2026-03-00412',
    title: '주요사항보고서 (공급계약 체결)',
    date: '2026.03.13',
    category: '공급계약',
  },
  {
    id: '1',
    title: '연결재무제표 기준 영업(잠정)실적 공시',
    date: '2026.02.28',
    category: '실적발표',
  },
  {
    id: '2',
    title: '사업보고서 (제56기)',
    date: '2026.01.30',
    category: '보고서',
  },
  {
    id: '3',
    title: '배당결정 공시 – 보통주 1주당 500원',
    date: '2026.01.20',
    category: '배당',
  },
];

import type { DisclosureListItem } from '@/types/disclosure';

/** 공시 목록 페이지용 (뉴스 카드 UI·회사 표시) */
export const MOCK_COMPANY_DISCLOSURES: DisclosureListItem[] = [
  {
    id: '2026-03-00412',
    title: '주요사항보고서 (공급계약 체결)',
    date: '2026.03.13',
    category: '공급계약',
    companyName: '삼성전자',
    summaryPoints: [
      '북미 최대 데이터센터 운영사와 NVMe SSD 대규모 공급 계약 체결',
      '계약 기간 2년, 총 계약 금액 약 1조 2,400억 원 규모',
    ],
  },
  {
    id: '1',
    title: '연결재무제표 기준 영업(잠정)실적 공시',
    date: '2026.02.28',
    category: '실적발표',
    companyName: '삼성전자',
    summaryPoints: ['연결재무제표 기준 영업실적 잠정 집계 결과 공시'],
  },
  {
    id: '2',
    title: '사업보고서 (제56기)',
    date: '2026.01.30',
    category: '보고서',
    companyName: '삼성전자',
    summaryPoints: ['제56기 사업보고서 제출'],
  },
  {
    id: '3',
    title: '배당결정 공시 – 보통주 1주당 500원',
    date: '2026.01.20',
    category: '배당',
    companyName: '삼성전자',
    summaryPoints: ['보통주 1주당 500원 배당 결정'],
  },
];

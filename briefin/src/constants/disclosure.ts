import { DisclosureDetail } from '@/types/disclosure';

export const ROWS: { key: keyof DisclosureDetail['details']; label: string; highlight?: boolean }[] = [
  { key: 'partner', label: '계약 상대방' },
  { key: 'content', label: '계약 내용' },
  { key: 'amount', label: '계약 금액', highlight: true },
  { key: 'period', label: '계약 기간' },
  { key: 'ratio', label: '매출액 대비' },
  { key: 'reportType', label: '공시 구분' },
];

import type { Company } from '@/types/company';

/** 온보딩 관심 기업 선택용 더미 데이터 (9개, 3x3 그리드). API 연동 시 fetch로 교체 */
export const MOCK_ONBOARDING_COMPANIES: Company[] = [
  { id: '1', name: '삼성전자', logo: '📱', industry: '반도체·전자', logoBg: 'bg-[#EFF6FF]' },
  { id: '2', name: 'SK하이닉스', logo: '💾', industry: '반도체', logoBg: 'bg-[#DBEAFE]' },
  { id: '3', name: '현대자동차', logo: '🚗', industry: '자동차', logoBg: 'bg-[#EFF6FF]' },
  { id: '4', name: '카카오뱅크', logo: '🏦', industry: '뱅크', logoBg: 'bg-[#BFDBFE]' },
  { id: '5', name: 'LG에너지솔루션', logo: '🔋', industry: '배터리', logoBg: 'bg-[#DBEAFE]' },
  { id: '6', name: '네이버', logo: '🟢', industry: 'IT·플랫폼', logoBg: 'bg-[#EFF6FF]' },
  { id: '7', name: '카카오', logo: '💛', industry: '플랫폼', logoBg: 'bg-[#BFDBFE]' },
  { id: '8', name: '두산에너빌리티', logo: '⚡', industry: '에너지', logoBg: 'bg-[#EFF6FF]' },
  { id: '9', name: '셀트리온', logo: '🧬', industry: '바이오', logoBg: 'bg-[#DBEAFE]' },
];

export const STORAGE_KEY_SELECTED_COMPANIES = 'selectedCompanies';

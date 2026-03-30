import { NewsTimelineItem } from '@/types/timeline';

export const TIMELINE_TAGS = ['# HBM4', '# NVMe SSD', '# OLED', '# 파운드리'];

export const MOCK_TIMELINE_ITEMS: NewsTimelineItem[] = [
  {
    date: '2025.03.27',
    title: '삼성전자, 2분기 HBM4 양산 본격화…엔비디아 공급 확대 기대',
    source: '한국경제',
    tag: '# HBM4',
    isLatest: true,
    newsId: 'timeline-1',
  },
  {
    date: '2025.02.18',
    title: '삼성전자, HBM4 수율 개선 성공…경쟁사 대비 6개월 앞서',
    source: '전자신문',
    tag: '# HBM4',
    newsId: 'timeline-2',
  },
  {
    date: '2025.01.09',
    title: 'CES 2025서 삼성 HBM4 로드맵 공개…AI 가속기 수요 대응',
    source: '디지털타임스',
    tag: '# HBM4',
    newsId: 'timeline-3',
  },
  {
    date: '2024.11.14',
    title: '삼성전자 HBM4 개발 착수 공식화…2025년 양산 목표',
    source: '연합뉴스',
    tag: '# HBM4',
    newsId: 'timeline-4',
  },
  // NVMe SSD
  {
    date: '2025.03.20',
    title: '삼성전자, 북미 최대 데이터센터와 NVMe SSD 공급 계약 체결',
    source: '로이터',
    tag: '# NVMe SSD',
    isLatest: true,
    newsId: 'timeline-5',
  },
  {
    date: '2025.01.22',
    title: '삼성전자 PCIe 5.0 NVMe SSD, 엔터프라이즈 시장 점유율 1위 달성',
    source: '블룸버그',
    tag: '# NVMe SSD',
    newsId: 'timeline-6',
  },
  // OLED
  {
    date: '2026.01.15',
    title: '삼성전자, CES 2026서 차세대 OLED 패널 공개',
    source: '한국경제',
    tag: '# OLED',
    isLatest: true,
    newsId: 'timeline-7',
  },
  {
    date: '2025.09.03',
    title: '삼성전자 OLED 패널, 애플 신규 맥북 탑재 확정',
    source: '더버지',
    tag: '# OLED',
    newsId: 'timeline-8',
  },
  // 파운드리
  {
    date: '2025.03.10',
    title: '삼성 파운드리, 2나노 공정 시범 생산 돌입…TSMC와 격차 좁혀',
    source: '조선비즈',
    tag: '# 파운드리',
    isLatest: true,
    newsId: 'timeline-9',
  },
  {
    date: '2024.12.05',
    title: '삼성전자, 미국 텍사스 파운드리 공장 가동률 80% 회복',
    source: '연합뉴스',
    tag: '# 파운드리',
    newsId: 'timeline-10',
  },
];

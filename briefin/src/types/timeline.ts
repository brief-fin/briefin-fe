export interface NewsTimelineItem {
  id: string;
  date: string;       // e.g. "2025.03.27"
  title: string;
  source: string;
  tag: string;        // which tag this item belongs to
  isLatest?: boolean;
  newsId?: string;    // for navigation after API integration
}

export interface NewsTimelineProps {
  /** 필터 태그 목록 */
  tags: string[];
  /** 현재 선택된 태그 */
  activeTag: string;
  /** 태그 변경 핸들러 */
  onTagChange: (tag: string) => void;
  /** 타임라인 아이템 목록 (activeTag로 이미 필터된 목록을 넘기거나 전체를 넘겨도 됨) */
  items: NewsTimelineItem[];
  /** 로딩 스켈레톤 표시 여부 */
  loading?: boolean;
}

import NewsTimeline from '@/components/common/NewsTimeline';
import { MOCK_TIMELINE_ITEMS } from '@/mocks/timelineData';

/**
 * 뉴스 페이지 사이드바용 타임라인 래퍼
 * API 연동 시 이 컴포넌트에서 fetch 로직을 추가하면 됩니다.
 */
export default function NewsTimelineSidebar() {
  const items = MOCK_TIMELINE_ITEMS;

  return <NewsTimeline items={items} />;
}

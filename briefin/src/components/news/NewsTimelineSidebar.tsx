'use client';

import { useState } from 'react';
import NewsTimeline from '@/components/common/NewsTimeline';
import { TIMELINE_TAGS, MOCK_TIMELINE_ITEMS } from '@/mocks/timelineData';

/**
 * 뉴스 페이지 사이드바용 타임라인 래퍼
 * API 연동 시 이 컴포넌트에서 fetch 로직을 추가하면 됩니다.
 */
export default function NewsTimelineSidebar() {
  const [activeTag, setActiveTag] = useState(TIMELINE_TAGS[0]);

  // TODO: API 연동 시 activeTag 변경 때마다 fetch
  const items = MOCK_TIMELINE_ITEMS;

  return (
    <NewsTimeline
      tags={TIMELINE_TAGS}
      activeTag={activeTag}
      onTagChange={setActiveTag}
      items={items}
    />
  );
}

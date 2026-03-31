'use client';

import NewsCard from '@/components/news/NewsCard';
import AlertBanner from '@/components/common/AlertBanner';
import { useFeed } from '@/hooks/useFeed';
import { mapNewsItem } from '@/lib/viewMappers';

export default function FeedPage() {
  const { data, isLoading, isError } = useFeed();

  return (
    <main className="min-h-screen bg-surface-bg py-36pxr">
      {/* Header */}
      <div className="pb-16pxr">
        <h1 className="fonts-heading3">내 피드</h1>
        <p className="mt-4pxr text-[14px] text-text-muted">관심 등록한 기업의 소식만 모았어요</p>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-16pxr lg:flex-row lg:items-start">
        {/* Left: news list */}
        <div className="flex flex-1 flex-col gap-14pxr">
          {isLoading && <p className="fonts-label py-40pxr text-center text-text-muted">뉴스를 불러오는 중...</p>}
          {isError && <p className="fonts-label py-40pxr text-center text-text-muted">뉴스를 불러오지 못했습니다.</p>}
          {data && data.length === 0 && (
            <p className="fonts-label py-40pxr text-center text-text-muted">관심 기업의 뉴스가 없습니다.</p>
          )}
          {data?.map((item) => (
            <NewsCard key={item.newsId} news={mapNewsItem(item)} />
          ))}
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-16pxr lg:w-96 lg:shrink-0">
          <AlertBanner
            title="관심 기업을 더 추가해보세요"
            description="더 많은 기업을 등록할수록 내 피드가 풍성해져요."
            buttonLabel="관심 기업 추가하기"
            buttonHref="/onboarding"
          />
        </div>
      </div>
    </main>
  );
}

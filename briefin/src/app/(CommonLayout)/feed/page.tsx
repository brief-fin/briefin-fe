'use client';

import Link from 'next/link';
import NewsCard from '@/components/news/NewsCard';
import AlertBanner from '@/components/common/AlertBanner';
import PopularCompanyList from '@/components/common/PopularCompanyList';
import { MOCK_FEED_NEWS, MOCK_WATCHLIST } from '@/mocks/feed';

export default function FeedPage() {
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
          {MOCK_FEED_NEWS.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-16pxr lg:w-96 lg:shrink-0">
          <AlertBanner
            title="관심 기업을 더 추가해보세요"
            description="더 많은 기업을 등록할수록 내 피드가 풍성해져요."
            buttonLabel="🏢 관련 기업 추가하기"
            buttonHref="/mypage?tab=watchlist"
          />
          <PopularCompanyList title="👀 내 관심 기업" companies={MOCK_WATCHLIST} />
          <Link
          href="/mypage?tab=watchlist"
          className="block text-center text-[13px] font-bold text-text-muted hover:text-text-primary">
          관심 기업 관리 →
        </Link>
        </div>
      </div>
    </main>
  );
}

'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MyPageHeader from '@/components/mypage/mypageheader';
import Tabs from '@/components/common/Tabs';
import AccountSection from '@/components/mypage/AccountSection';
import WatchlistSection from '@/components/mypage/WatchlistSection';
import SubscribedCompaniesSection from '@/components/mypage/SubscribedCompaniesSection';
import MyPageNewsCard from '@/components/mypage/MyPageNewsCard';
import { MyPageTab } from '@/types/mypage';
import { TAB_FROM_QUERY, TAB_TO_QUERY, MY_PAGE_TABS } from '@/constants/mypage';
import { useMyInfo, useScrappedNews, useRecentNews, useWatchlist } from '@/hooks/useUser';
import { useDeleteScrapNews } from '@/hooks/useNews';
import { useAuthStatus } from '@/providers/AuthSessionProvider';
import { formatDateTime } from '@/utils/date';

const NAV_ICONS: Record<MyPageTab, React.ReactNode> = {
  '관심 기업': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  '공시 알림 기업': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  '스크랩 뉴스': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  '최근 본 뉴스': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  '계정 관리': (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

function MyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab');
  const activeTab: MyPageTab = tabParam && TAB_FROM_QUERY[tabParam] ? TAB_FROM_QUERY[tabParam] : '관심 기업';

  const authStatus = useAuthStatus();
  const isAuthenticated = authStatus === 'authenticated';

  const { data: userInfo } = useMyInfo();
  const { data: watchlist } = useWatchlist({ enabled: isAuthenticated });
  const { data: scrapsData, isLoading: scrapsLoading } = useScrappedNews(1, { enabled: isAuthenticated });
  const { data: recentData, isLoading: recentLoading } = useRecentNews(1, { enabled: isAuthenticated });
  const { mutate: deleteScrap } = useDeleteScrapNews();
  const [unscrappedIds, setUnscrappedIds] = useState<Set<number>>(new Set());

  const handleTabChange = (tab: MyPageTab) => {
    router.push(`/mypage?tab=${TAB_TO_QUERY[tab]}`);
  };

  const handleLogout = () => {
    console.log('로그아웃');
  };

  const tabIcons: Partial<Record<MyPageTab, React.ReactNode>> = {
    '관심 기업': (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    '공시 알림 기업': (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    '스크랩 뉴스': (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    '최근 본 뉴스': (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <MyPageHeader
        email={userInfo?.email ?? ''}
        onLogout={handleLogout}
        watchlistCount={watchlist?.length}
        scrapCount={scrapsData?.totalCount}
        recentCount={recentData?.totalCount}
      />
      <Tabs tabs={MY_PAGE_TABS} activeTab={activeTab} onTabChange={handleTabChange} tabIcons={tabIcons} />

      <div className="pt-28pxr">
        {activeTab === '관심 기업' && <WatchlistSection />}
        {activeTab === '공시 알림 기업' && <SubscribedCompaniesSection />}
        {activeTab === '스크랩 뉴스' && (
          <div className="flex flex-col gap-12pxr">
            {scrapsLoading && <p className="py-40pxr text-center text-[14px] text-text-muted">불러오는 중...</p>}
            {!scrapsLoading && (!scrapsData?.scrapList || scrapsData.scrapList.length === 0) && (
              <div className="flex flex-col items-center gap-12pxr py-60pxr text-center">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E5E7EB]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="fonts-body font-medium text-text-primary">스크랩한 뉴스가 없어요</p>
                <p className="fonts-label text-text-muted">뉴스를 스크랩하면 여기서 모아볼 수 있어요.</p>
              </div>
            )}
            {scrapsData?.scrapList?.map((news) => (
              <MyPageNewsCard
                key={news.newsId}
                newsId={news.newsId}
                title={news.title}
                summary={news.summary}
                source={news.source}
                date={formatDateTime(news.scrapedAt)}
                thumbnailUrl={news.thumbnailUrl}
                topLeftSlot={
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteScrap(news.newsId);
                      setUnscrappedIds((prev) => new Set(prev).add(news.newsId));
                    }}
                    aria-label="스크랩 취소"
                    className="shrink-0 rounded-full pb-6pxr pr-6pxr transition-colors hover:bg-surface-bg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={unscrappedIds.has(news.newsId) ? 'none' : '#1E3A8A'}
                      stroke={unscrappedIds.has(news.newsId) ? '#9CA3AF' : '#1E3A8A'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                }
              />
            ))}
          </div>
        )}
        {activeTab === '최근 본 뉴스' && (
          <div className="flex flex-col gap-12pxr">
            {recentLoading && <p className="py-40pxr text-center text-[14px] text-text-muted">불러오는 중...</p>}
            {!recentLoading && (!recentData?.recentList || recentData.recentList.length === 0) && (
              <div className="flex flex-col items-center gap-12pxr py-60pxr text-center">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E5E7EB]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="fonts-body font-medium text-text-primary">최근 본 뉴스가 없어요</p>
                <p className="fonts-label text-text-muted">뉴스를 읽으면 자동으로 여기에 기록돼요.</p>
              </div>
            )}
            {recentData?.recentList?.map((news) => (
              <MyPageNewsCard
                key={news.newsId}
                newsId={news.newsId}
                title={news.title}
                summary={news.summary}
                source={news.source}
                date={formatDateTime(news.viewedAt)}
                thumbnailUrl={news.thumbnailUrl}
              />
            ))}
          </div>
        )}
        {activeTab === '계정 관리' && <AccountSection />}
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-bg py-36pxr" />}>
      <MyPageContent />
    </Suspense>
  );
}

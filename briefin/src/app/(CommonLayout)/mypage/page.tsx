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
import { WatchlistIcon, AlertIcon, ScrapIcon, RecentIcon, AccountIcon } from '@/constants/mypageIcons';
import { useMyInfo, useScrappedNews, useRecentNews, useWatchlist } from '@/hooks/useUser';
import { useDeleteScrapNews } from '@/hooks/useNews';
import { useAuthStatus } from '@/providers/AuthSessionProvider';
import { formatDateTime } from '@/utils/date';

const NAV_ICONS: Record<MyPageTab, React.ReactNode> = {
  '관심 기업': <WatchlistIcon />,
  '공시 알림 기업': <AlertIcon />,
  '스크랩 뉴스': <ScrapIcon />,
  '최근 본 뉴스': <RecentIcon />,
  '계정 관리': <AccountIcon />,
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
    '관심 기업': <WatchlistIcon size={13} fill="currentColor" strokeWidth="1.5" />,
    '공시 알림 기업': <AlertIcon size={13} strokeWidth="2.2" />,
    '스크랩 뉴스': <ScrapIcon size={13} />,
    '최근 본 뉴스': <RecentIcon size={13} />,
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
                  <ScrapIcon size={22} stroke="#9CA3AF" />
                </div>
                <p className="fonts-body font-medium text-text-primary">스크랩한 뉴스가 없어요</p>
                <p className="fonts-label text-text-muted">뉴스를 읽다가 북마크 아이콘을 누르면 여기에 저장돼요.</p>
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
                  <RecentIcon size={22} stroke="#9CA3AF" />
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

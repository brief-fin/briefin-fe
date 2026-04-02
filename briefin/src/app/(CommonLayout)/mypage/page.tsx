'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MyPageHeader from '@/components/mypage/mypageheader';
import AccountSection from '@/components/mypage/AccountSection';
import WatchlistSection from '@/components/mypage/WatchlistSection';
import SubscribedCompaniesSection from '@/components/mypage/SubscribedCompaniesSection';
import MyPageNewsCard from '@/components/mypage/MyPageNewsCard';
import { MyPageTab } from '@/types/mypage';
import { TAB_FROM_QUERY, TAB_TO_QUERY, MY_PAGE_TABS } from '@/constants/mypage';
import { WatchlistIcon, AlertIcon, ScrapIcon, RecentIcon, AccountIcon } from '@/constants/mypageIcons';
import { useMyInfo, useScrappedNews, useRecentNews, useWatchlist } from '@/hooks/useUser';
import { useDeleteScrapNews } from '@/hooks/useNews';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSubscribedCompanies } from '@/api/disclosureApi';
import { SUBSCRIBED_COMPANIES_KEY } from '@/components/mypage/SubscribedCompaniesSection';
import { useAuthStatus } from '@/providers/AuthSessionProvider';
import { formatDateTime } from '@/utils/date';
import { logout as logoutApi } from '@/api/authApi';
import { authStore } from '@/store/authStore';
import { markExplicitLogout } from '@/lib/refreshSession';

const NAV_ICONS: Record<MyPageTab, React.ReactNode> = {
  '관심 기업': <WatchlistIcon />,
  '공시 알림 기업': <AlertIcon />,
  '스크랩 뉴스': <ScrapIcon />,
  '최근 본 뉴스': <RecentIcon />,
  '계정 관리': <AccountIcon />,
};

const MOBILE_ICONS: Partial<Record<MyPageTab, React.ReactNode>> = {
  '관심 기업': <WatchlistIcon size={13} fill="currentColor" strokeWidth="1.5" />,
  '공시 알림 기업': <AlertIcon size={13} strokeWidth="2.2" />,
  '스크랩 뉴스': <ScrapIcon size={13} />,
  '최근 본 뉴스': <RecentIcon size={13} />,
};

function MyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const tabParam = searchParams.get('tab');
  const activeTab: MyPageTab = tabParam && TAB_FROM_QUERY[tabParam] ? TAB_FROM_QUERY[tabParam] : '관심 기업';

  const authStatus = useAuthStatus();
  const isAuthenticated = authStatus === 'authenticated';

  const { data: userInfo } = useMyInfo();
  const { data: watchlist } = useWatchlist({ enabled: isAuthenticated });
  const { data: scrapsData, isLoading: scrapsLoading } = useScrappedNews(1, { enabled: isAuthenticated });
  const { data: recentData, isLoading: recentLoading } = useRecentNews(1, { enabled: isAuthenticated });
  const { data: subscribedCompanies } = useQuery({
    queryKey: SUBSCRIBED_COMPANIES_KEY,
    queryFn: fetchSubscribedCompanies,
    enabled: isAuthenticated,
  });
  const { mutate: deleteScrap } = useDeleteScrapNews();
  const [unscrappedIds, setUnscrappedIds] = useState<Set<number>>(new Set());

  const handleTabChange = (tab: MyPageTab) => {
    router.push(`/mypage?tab=${TAB_TO_QUERY[tab]}`);
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      /* 서버 오류여도 클라이언트 세션은 종료 */
    } finally {
      queryClient.clear();
      markExplicitLogout();
      authStore.clear();
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      {/* 모바일: 배너 상단 */}
      <div className="mb-20pxr lg:hidden">
        <MyPageHeader
          email={userInfo?.email ?? ''}
          onLogout={handleLogout}
          watchlistCount={watchlist?.length}
          alertCount={subscribedCompanies?.length}
          scrapCount={scrapsData?.totalCount}
        />
      </div>

      <div className="lg:flex lg:items-start lg:gap-24pxr">
        {/* 데스크탑: 좌측 사이드바 */}
        <div className="hidden lg:flex lg:w-72 lg:shrink-0 lg:flex-col lg:gap-8pxr">
          <MyPageHeader
            email={userInfo?.email ?? ''}
            onLogout={handleLogout}
            watchlistCount={watchlist?.length}
            alertCount={subscribedCompanies?.length}
            scrapCount={scrapsData?.totalCount}
          />
          <nav className="flex flex-col gap-2pxr">
            {MY_PAGE_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`flex items-center gap-12pxr rounded-xl px-16pxr py-13pxr text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                  }`}>
                  <span className={isActive ? 'text-white' : 'text-text-muted'}>
                    {NAV_ICONS[tab]}
                  </span>
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 모바일: 가로 탭 */}
          <div className="mb-20pxr flex gap-6pxr overflow-x-auto pb-2pxr lg:hidden">
            {MY_PAGE_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`flex shrink-0 items-center gap-6pxr rounded-full px-14pxr py-8pxr text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'border border-surface-border bg-surface-white text-text-secondary hover:bg-surface-muted'
                  }`}>
                  {MOBILE_ICONS[tab]}
                  {tab}
                </button>
              );
            })}
          </div>

          {/* 데스크탑: 탭 제목 */}
          <div className="mb-16pxr hidden lg:block">
            <h2 className="fonts-heading3 text-text-primary">{activeTab}</h2>
          </div>

          {activeTab === '관심 기업' && <WatchlistSection />}
          {activeTab === '공시 알림 기업' && <SubscribedCompaniesSection />}
          {activeTab === '스크랩 뉴스' && (
            <div className="flex flex-col gap-12pxr">
              {scrapsLoading && <p className="py-40pxr text-center text-[14px] text-text-muted">불러오는 중...</p>}
              {!scrapsLoading && (!scrapsData?.scrapList || scrapsData.scrapList.length === 0) && (
                <div className="flex flex-col items-center gap-12pxr py-60pxr text-center">
                  <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#E5E7EB]">
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
                  <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#E5E7EB]">
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

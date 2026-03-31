'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Tabs from '@/components/common/Tabs';
import MyPageHeader from '@/components/mypage/mypageheader';
import AccountSection from '@/components/mypage/AccountSection';
import WatchlistSection from '@/components/mypage/WatchlistSection';
import Link from 'next/link';
import { MyPageTab } from '@/types/mypage';
import { TAB_FROM_QUERY, TAB_TO_QUERY, MY_PAGE_TABS } from '@/constants/mypage';
import { useMyInfo, useScrappedNews, useRecentNews } from '@/hooks/useUser';
import { useDeleteScrapNews } from '@/hooks/useNews';
import { formatDateTime } from '@/utils/date';

function MyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab');
  const activeTab: MyPageTab = tabParam && TAB_FROM_QUERY[tabParam] ? TAB_FROM_QUERY[tabParam] : '관심 기업';

  const { data: userInfo } = useMyInfo();
  const { data: scrapsData, isLoading: scrapsLoading } = useScrappedNews();
  const { data: recentData, isLoading: recentLoading } = useRecentNews();
  const { mutate: deleteScrap } = useDeleteScrapNews();
  const [unscrappedIds, setUnscrappedIds] = useState<Set<number>>(new Set());

  const handleTabChange = (tab: MyPageTab) => {
    router.push(`/mypage?tab=${TAB_TO_QUERY[tab]}`);
  };

  const handleLogout = () => {
    console.log('로그아웃');
  };

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <MyPageHeader email={userInfo?.email ?? ''} onLogout={handleLogout} />
      <Tabs tabs={MY_PAGE_TABS} activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="pt-28pxr">
        {activeTab === '관심 기업' && <WatchlistSection />}
        {activeTab === '스크랩 뉴스' && (
          <div className="flex flex-col gap-12pxr">
            {scrapsLoading && <p className="py-40pxr text-center text-[14px] text-text-muted">불러오는 중...</p>}
            {!scrapsLoading && (!scrapsData?.scrapList || scrapsData.scrapList.length === 0) && (
              <p className="py-40pxr text-center text-[14px] text-text-muted">스크랩한 뉴스가 없습니다.</p>
            )}
            {scrapsData?.scrapList?.map((news) => (
              <Link
                key={news.newsId}
                href={`/news/${news.newsId}`}
                className="flex items-start gap-12pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr transition-colors hover:bg-surface-bg">
                <div className="flex min-w-0 flex-1 flex-col gap-6pxr">
                  <p className="text-[14px] font-bold text-text-primary">{news.title}</p>
                  {news.summary && <p className="fonts-caption line-clamp-2 text-text-muted">{news.summary}</p>}
                  <p className="fonts-caption text-text-disabled">
                    {news.source} · {news.scrapedAt}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteScrap(news.newsId);
                    setUnscrappedIds((prev) => new Set(prev).add(news.newsId));
                  }}
                  className={`shrink-0 text-[20px] transition-colors ${unscrappedIds.has(news.newsId) ? 'text-text-muted' : 'text-yellow-400'}`}>
                  ★
                </button>
              </Link>
            ))}
          </div>
        )}
        {activeTab === '최근 본 뉴스' && (
          <div className="flex flex-col gap-12pxr">
            {recentLoading && <p className="py-40pxr text-center text-[14px] text-text-muted">불러오는 중...</p>}
            {!recentLoading && (!recentData?.recentList || recentData.recentList.length === 0) && (
              <p className="py-40pxr text-center text-[14px] text-text-muted">최근 본 뉴스가 없습니다.</p>
            )}
            {recentData?.recentList?.map((news) => (
              <Link
                key={news.newsId}
                href={`/news/${news.newsId}`}
                className="flex flex-col gap-6pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr transition-colors hover:bg-surface-bg">
                <p className="text-[14px] font-bold text-text-primary">{news.title}</p>
                {news.summary && <p className="fonts-caption line-clamp-2 text-text-muted">{news.summary}</p>}
                <p className="fonts-caption text-text-disabled">
                  {news.source} · {formatDateTime(news.viewedAt)}
                </p>
              </Link>
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

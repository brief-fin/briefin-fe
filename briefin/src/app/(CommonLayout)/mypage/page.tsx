'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Tabs from '@/components/common/Tabs';
import MyPageHeader from '@/components/mypage/mypageheader';

type MyPageTab = '관심 기업' | '스크랩 뉴스' | '최근 본 뉴스' | '계정 관리';

const MY_PAGE_TABS: MyPageTab[] = ['관심 기업', '스크랩 뉴스', '최근 본 뉴스', '계정 관리'];

const TAB_FROM_QUERY: Record<string, MyPageTab> = {
  watchlist: '관심 기업',
  scrap: '스크랩 뉴스',
  recent: '최근 본 뉴스',
  account: '계정 관리',
};

const TAB_TO_QUERY: Record<MyPageTab, string> = {
  '관심 기업': 'watchlist',
  '스크랩 뉴스': 'scrap',
  '최근 본 뉴스': 'recent',
  '계정 관리': 'account',
};

export default function MyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab: MyPageTab = tabParam && TAB_FROM_QUERY[tabParam] ? TAB_FROM_QUERY[tabParam] : '스크랩 뉴스';

  const handleTabChange = (tab: MyPageTab) => {
    router.push(`/mypage?tab=${TAB_TO_QUERY[tab]}`);
  };

  const handleLogout = () => {
    console.log('로그아웃');
  };

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <MyPageHeader email="user@example.com" onLogout={handleLogout} />
      <Tabs tabs={MY_PAGE_TABS} activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="pt-28pxr">
        {activeTab === '관심 기업' && <div>{/* 관심 기업 컨텐츠 */}</div>}
        {activeTab === '스크랩 뉴스' && <div>{/* 스크랩 뉴스 컨텐츠 */}</div>}
        {activeTab === '최근 본 뉴스' && <div>{/* 최근 본 뉴스 컨텐츠 */}</div>}
        {activeTab === '계정 관리' && <div>{/* 계정 관리 컨텐츠 */}</div>}
      </div>
    </div>
  );
}

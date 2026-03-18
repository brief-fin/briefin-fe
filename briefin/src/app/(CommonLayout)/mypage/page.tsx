'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export default function MyPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<MyPageTab>('스크랩 뉴스');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && TAB_FROM_QUERY[tab]) {
      setActiveTab(TAB_FROM_QUERY[tab]);
    }
  }, [searchParams]);

  const handleLogout = () => {
    console.log('로그아웃');
  };

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <MyPageHeader email="user@example.com" onLogout={handleLogout} />
      <Tabs tabs={MY_PAGE_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="pt-28pxr">
        {activeTab === '관심 기업' && <div>{/* 관심 기업 컨텐츠 */}</div>}
        {activeTab === '스크랩 뉴스' && <div>{/* 스크랩 뉴스 컨텐츠 */}</div>}
        {activeTab === '최근 본 뉴스' && <div>{/* 최근 본 뉴스 컨텐츠 */}</div>}
        {activeTab === '계정 관리' && <div>{/* 계정 관리 컨텐츠 */}</div>}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import MyPageHeader from '@/components/mypage/mypageheader';
import MyPageTabs, { MyPageTab } from '@/components/mypage/mypagetabs';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<MyPageTab>('스크랩 뉴스');

  const handleLogout = () => {
    console.log('로그아웃');
  };

  return (
    <div className="min-h-screen bg-surface-bg">
      <MyPageHeader email="user@example.com" onLogout={handleLogout} />
      <MyPageTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="px-24pxr pt-28pxr">
        {activeTab === '관심 기업' && <div>{/* 관심 기업 컨텐츠 */}</div>}
        {activeTab === '스크랩 뉴스' && <div>{/* 스크랩 뉴스 컨텐츠 */}</div>}
        {activeTab === '최근 본 뉴스' && <div>{/* 최근 본 뉴스 컨텐츠 */}</div>}
        {activeTab === '계정 관리' && <div>{/* 계정 관리 컨텐츠 */}</div>}
      </div>
    </div>
  );
}

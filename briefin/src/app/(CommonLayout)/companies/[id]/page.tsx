'use client';

import { useState } from 'react';
import Link from 'next/link';
import Tabs from '@/components/common/Tabs';
import CompanyHero from '@/components/companies/CompanyHero';
import NewsCard from '@/components/news/NewsCard';
import AlertBanner from '@/components/common/AlertBanner';
import PopularCompanyList from '@/components/common/PopularCompanyList';
import DisclosureList from '@/components/disclosure/DisclosureList';
import { MOCK_COMPANY, MOCK_NEWS, MOCK_RELATED_COMPANIES } from '@/mocks/companyDetail';
import { MOCK_COMPANY_DISCLOSURES } from '@/mocks/disclosureDetail';
import { COMPANY_DETAIL_TABS, type CompanyDetailTab } from '@/constants/companyDetail';

export default function CompanyDetailPage() {
  const [activeTab, setActiveTab] = useState<CompanyDetailTab>('관련 뉴스');

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      {/* 뒤로가기 */}
      <div className="pt-20pxr sm:pt-28pxr">
        <Link
          href="/companies"
          className="fonts-label inline-flex items-center gap-4pxr rounded-button border border-surface-border bg-surface-white px-12pxr py-8pxr font-bold text-text-secondary transition-colors hover:bg-surface-bg sm:px-14pxr sm:py-10pxr sm:text-[14px]">
          ← 뉴스 목록으로
        </Link>
      </div>

      {/* 히어로 */}
      <div className="mt-14pxr sm:mt-18pxr md:mt-20pxr">
        <CompanyHero {...MOCK_COMPANY} />
      </div>

      {/* 탭 */}
      <div className="mt-20pxr">
        <Tabs tabs={COMPANY_DETAIL_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 컨텐츠 — 모바일: 단일 컬럼 / 데스크톱: 좌우 2컬럼 */}
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        {/* 좌: 뉴스 목록 */}
        <div className="min-w-0 flex-1 flex flex-col gap-14pxr">
          {activeTab === '관련 뉴스' && MOCK_NEWS.map((news) => <NewsCard key={news.id} news={news} />)}
          {activeTab === '공시' && <DisclosureList items={MOCK_COMPANY_DISCLOSURES} />}
        </div>

        {/* 우: 사이드바 — 모바일에서는 탭 컨텐츠 아래 전체 너비 */}
        <div className="flex w-full flex-col gap-14pxr lg:w-96">
          <AlertBanner
            title="🔔 공시 알림 받기"
            description="이 기업의 새 공시·뉴스를 실시간으로 받아보세요."
            buttonLabel="알림 설정하기"
          />

          <PopularCompanyList title="관련 기업" companies={MOCK_RELATED_COMPANIES} />
        </div>
      </div>
    </div>
  );
}

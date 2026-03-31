'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Tabs from '@/components/common/Tabs';
import CompanyHero from '@/components/companies/CompanyHero';
import NewsCard from '@/components/news/NewsCard';
import AlertBanner from '@/components/common/AlertBanner';
import NewsTimeline from '@/components/common/NewsTimeline';
import DisclosureList from '@/components/disclosure/DisclosureList';
import { MOCK_COMPANY_DISCLOSURES } from '@/mocks/disclosureDetail';
import { COMPANY_DETAIL_TABS, type CompanyDetailTab } from '@/constants/companyDetail';
import { CompanyDetail, fetchCompanyDetail } from '@/api/companyApi';
import { fetchCompanyNews, toNewsItem } from '@/api/newsApi';
import type { NewsItem } from '@/types/news';
import { TIMELINE_TAGS, MOCK_TIMELINE_ITEMS } from '@/mocks/timelineData';
import { useStockPrice } from '@/api/hook/useStockPrice';
import { apiClient } from '@/api/client';
import { useAuthSessionVersion } from '@/providers/AuthSessionProvider';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<CompanyDetailTab>('관련 뉴스');
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTimelineTag, setActiveTimelineTag] = useState(TIMELINE_TAGS[0]);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);

  const sessionVersion = useAuthSessionVersion();

  const stockPrice = useStockPrice(company?.ticker ?? null);

  useEffect(() => {
    if (!id) return;
    if (sessionVersion) {
      fetchCompanyDetail(Number(id))
        .then((data) => {
          setCompany(data);
          setIsWatchlisted(data.watchlisted ?? false); // 백엔드가 내려주는 경우
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, sessionVersion]);

  useEffect(() => {
    if (!id || !sessionVersion) return;
    let cancelled = false;
    setNewsLoading(true);
    fetchCompanyNews(Number(id))
      .then((data) => { if (!cancelled) setNews((data.content ?? []).map(toNewsItem)); })
      .catch((e) => { if (!cancelled) console.error(e); })
      .finally(() => { if (!cancelled) setNewsLoading(false); });
    return () => { cancelled = true; };
  }, [id, sessionVersion]);

  const handleToggleWatchlist = async () => {
    if (!company || watchlistLoading) return;

    setWatchlistLoading(true);
    try {
      if (isWatchlisted) {
        await apiClient.delete(`/api/users/${company.id}/watch`);
      } else {
        await apiClient.post(`/api/users/${company.id}/watch`);
      }
      setIsWatchlisted((prev) => !prev);
    } catch (e) {
      console.error('관심 기업 처리 실패:', e);
      alert('요청에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setWatchlistLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-surface-bg py-36pxr">로딩중...</div>;
  if (!company) return <div className="min-h-screen bg-surface-bg py-36pxr">기업 정보를 찾을 수 없어요.</div>;

  const stats = [
    {
      label: '현재가',
      value: (stockPrice?.currentPrice ?? company?.currentPrice ?? 0).toLocaleString(),
      unit: '원',
    },
    {
      label: '등락률',
      value: `${(stockPrice?.changeRate ?? company?.changeRate ?? 0) > 0 ? '+' : ''}${stockPrice?.changeRate ?? company?.changeRate ?? 0}`,
      unit: '%',
      isRise: (stockPrice?.changeRate ?? company?.changeRate ?? 0) > 0,
      isFall: (stockPrice?.changeRate ?? company?.changeRate ?? 0) < 0,
    },
    {
      label: '시가총액',
      value: (company?.marketCap ?? 0).toLocaleString(),
      unit: '억',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <div className="pt-20pxr sm:pt-28pxr">
        <Link
          href="/companies"
          className="fonts-label inline-flex items-center gap-4pxr rounded-button bg-surface-white px-12pxr py-8pxr font-bold text-text-secondary transition-shadow hover:shadow-md sm:px-14pxr sm:py-10pxr sm:text-[14px]">
          ← 뉴스 목록으로
        </Link>
      </div>

      <div className="mt-14pxr sm:mt-18pxr md:mt-20pxr">
        <CompanyHero
          industry={company.sector ?? '기타'}
          name={company.name}
          stats={stats}
          isWatchlisted={isWatchlisted}
          onToggleWatchlist={handleToggleWatchlist}
        />
      </div>

      {/* 이하 동일 */}
      <div className="mt-20pxr">
        <Tabs tabs={COMPANY_DETAIL_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <div className="flex min-w-0 flex-1 flex-col gap-14pxr">
          {activeTab === '관련 뉴스' && (
            newsLoading
              ? <div>뉴스 로딩중...</div>
              : news.length === 0
                ? (
                  <div className="flex flex-col items-center justify-center gap-8pxr py-60pxr text-center text-text-secondary">
                    <span className="text-32pxr">📭</span>
                    <p className="fonts-body font-medium">아직 관련 뉴스가 없어요</p>
                    <p className="fonts-label text-text-tertiary">새로운 뉴스가 등록되면 이곳에 표시됩니다.</p>
                  </div>
                )
                : news.map((item) => <NewsCard key={item.id} news={item} />)
          )}
          {activeTab === '공시' && <DisclosureList items={MOCK_COMPANY_DISCLOSURES} />}
        </div>

        <div className="flex w-full flex-col gap-14pxr lg:w-96">
          <AlertBanner
            title="🔔 공시 알림 받기"
            description="이 기업의 새 공시·뉴스를 실시간으로 받아보세요."
            buttonLabel="알림 설정하기"
          />
<NewsTimeline
            tags={TIMELINE_TAGS}
            activeTag={activeTimelineTag}
            onTagChange={setActiveTimelineTag}
            items={MOCK_TIMELINE_ITEMS}
          />
        </div>
      </div>
    </div>
  );
}

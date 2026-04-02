'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Tabs from '@/components/common/Tabs';
import CompanyHero from '@/components/companies/CompanyHero';
import NewsCard from '@/components/news/NewsCard';
import NewsCardSkeleton from '@/components/news/NewsCardSkeleton';
import AlertBanner from '@/components/common/AlertBanner';
import NewsTimeline from '@/components/common/NewsTimeline';
import DisclosureList from '@/components/disclosure/DisclosureList';
import { COMPANY_DETAIL_TABS, type CompanyDetailTab } from '@/constants/companyDetail';
import { CompanyDetail, fetchCompanyDetail, fetchCompanyTimeline } from '@/api/companyApi';
import { fetchCompanyNews, toNewsItem } from '@/api/newsApi';
import { fetchDisclosureList } from '@/api/disclosureApi';
import type { NewsItem } from '@/types/news';
import type { DisclosureListItem } from '@/types/disclosure';
import type { NewsTimelineItem } from '@/types/timeline';
import { useStockPrice } from '@/api/hook/useStockPrice';
import { useAuthSessionVersion, useAuthStatus } from '@/providers/AuthSessionProvider';
import CompanyDetailSkeleton from '@/components/companies/CompanyDetailSkeleton';
import { getSubscriptionStatus, subscribePush, unsubscribePush } from '@/lib/pushNotification';
import { useWatchlist, useWatchCompany, useUnwatchCompany } from '@/hooks/useUser';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<CompanyDetailTab>('관련 뉴스');
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [disclosures, setDisclosures] = useState<DisclosureListItem[]>([]);
  const [disclosuresLoading, setDisclosuresLoading] = useState(false);
  const [timeline, setTimeline] = useState<NewsTimelineItem[]>([]);
  const [timelineLoading, setTimelineLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [alertLoading, setAlertLoading] = useState(true);

  const sessionVersion = useAuthSessionVersion();
  const authStatus = useAuthStatus();

  const { data: watchlist } = useWatchlist({ enabled: authStatus === 'authenticated' });
  const { mutate: doWatch, isPending: watchPending } = useWatchCompany();
  const { mutate: doUnwatch, isPending: unwatchPending } = useUnwatchCompany();
  const watchlistLoading = watchPending || unwatchPending;

  const isWatchlisted = watchlist != null
    ? watchlist.some((c) => c.companyId === Number(id))
    : (company?.watchlisted ?? false);

  const stockPrice = useStockPrice(company?.ticker ?? null);

  useEffect(() => {
    if (!id) return;
    if (sessionVersion) {
      fetchCompanyDetail(Number(id))
        .then((data) => {
          setCompany(data);
          try {
            const key = 'company_recent_viewed';
            const prev = JSON.parse(localStorage.getItem(key) ?? '[]');
            const entry = { id: data.id, name: data.name, ticker: data.ticker };
            const next = [entry, ...prev.filter((c: { id: number }) => c.id !== data.id)].slice(0, 10);
            localStorage.setItem(key, JSON.stringify(next));
          } catch {}
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
      .then((data) => {
        if (!cancelled) setNews((data.content ?? []).map(toNewsItem));
      })
      .catch((e) => {
        if (!cancelled) console.error(e);
      })
      .finally(() => {
        if (!cancelled) setNewsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, sessionVersion]);

  useEffect(() => {
    if (!id || !sessionVersion) return;
    let cancelled = false;
    setDisclosures([]);
    setDisclosuresLoading(true);
    fetchDisclosureList({ companyId: Number(id) })
      .then((data) => {
        if (!cancelled) {
          setDisclosures(
            (data?.content ?? []).map((item) => ({
              id: String(item.disclosureId),
              title: item.title,
              date: item.disclosedAt ? item.disclosedAt.slice(0, 10).replace(/-/g, '.') : '',
              category: item.category ?? '',
              companyName: item.companyName,
              summaryPoints: item.keyPoints ?? [],
              sentiment: item.sentiment,
            })),
          );
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setDisclosures([]);
          console.error(e);
        }
      })
      .finally(() => {
        if (!cancelled) setDisclosuresLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, sessionVersion]);

  useEffect(() => {
    if (!id || !sessionVersion) return;
    let cancelled = false;
    setTimelineLoading(true);
    fetchCompanyTimeline(Number(id))
      .then((data) => {
        if (!cancelled) {
          const items: NewsTimelineItem[] = data.map((item, idx) => ({
            id: item.id,
            date: item.date ? item.date.replace(/-/g, '.') : '',
            title: item.title,
            source: item.type,
            tag: item.category ?? item.type,
            isLatest: idx === data.length - 1,
            newsId: item.type === '뉴스' ? item.id : undefined,
          }));
          setTimeline(items);
        }
      })
      .catch(() => { if (!cancelled) setTimeline([]); })
      .finally(() => { if (!cancelled) setTimelineLoading(false); });
    return () => { cancelled = true; };
  }, [id, sessionVersion]);

  useEffect(() => {
    if (!company || sessionVersion === 0) return;
    let cancelled = false;
    setAlertLoading(true);
    getSubscriptionStatus(company.id)
      .then((value) => {
        if (!cancelled) setIsSubscribed(value);
      })
      .catch(() => {
        if (!cancelled) setIsSubscribed(false);
      })
      .finally(() => {
        if (!cancelled) setAlertLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [company, sessionVersion]);

  const handleAlertClick = async () => {
    if (!company) return;
    if (!('serviceWorker' in navigator)) {
      alert('이 브라우저는 알림을 지원하지 않습니다.');
      return;
    }
    setAlertLoading(true);
    try {
      if (isSubscribed) {
        await unsubscribePush(company.id);
        setIsSubscribed(false);
      } else {
        const success = await subscribePush(company.id);
        if (success) setIsSubscribed(true);
      }
    } catch (error) {
      console.error('알림 설정 실패:', error);
      alert('알림 설정에 실패했습니다.');
    } finally {
      setAlertLoading(false);
    }
  };

  const handleToggleWatchlist = () => {
    if (!company || watchlistLoading) return;
    if (isWatchlisted) {
      doUnwatch(company.id);
    } else {
      doWatch(company.id);
    }
  };

  if (loading) return <CompanyDetailSkeleton />;
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
      <div className="mt-14pxr sm:mt-18pxr md:mt-20pxr">
        <CompanyHero
          industry={company.sector ?? '기타'}
          name={company.name}
          logoUrl={company.logoUrl}
          ticker={company.ticker}
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
          {activeTab === '관련 뉴스' &&
            (newsLoading ? (
              <>
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
              </>
            ) : news.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-8pxr py-60pxr text-center text-text-secondary">
                <span className="text-32pxr">📭</span>
                <p className="fonts-body font-medium">아직 관련 뉴스가 없어요</p>
                <p className="fonts-label text-text-tertiary">새로운 뉴스가 등록되면 이곳에 표시됩니다.</p>
              </div>
            ) : (
              news.map((item) => <NewsCard key={item.id} news={item} />)
            ))}
          {activeTab === '공시' &&
            (disclosuresLoading ? (
              <div className="flex flex-col gap-0 overflow-hidden rounded-card border border-surface-border bg-surface-white shadow-hero-card">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse border-b border-surface-border px-22pxr py-20pxr last:border-0">
                    <div className="mb-8pxr h-4 w-full rounded bg-gray-200" />
                    <div className="h-3 w-32 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : (
              <DisclosureList items={disclosures} />
            ))}
        </div>

        <div className="flex w-full flex-col gap-14pxr lg:w-96">
          <AlertBanner
            title="🔔 공시 알림 받기"
            description={`${company.name.replace(/\s*주식회사\s*$/, '')}의 새 공시가 올라오면 즉시 알려드려요.`}
            loading={alertLoading}
            buttonLabel={isSubscribed ? '알림 해제하기' : '알림 설정하기'}
            onButtonClick={handleAlertClick}
          />
          <NewsTimeline items={timeline} loading={timelineLoading} title="기업 히스토리" />
        </div>
      </div>
    </div>
  );
}

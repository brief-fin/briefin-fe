'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CompanySearchInput from '@/components/companies/CompanySearchInput';
import { apiClient } from '@/api/client';
import { useAuthStatus } from '@/providers/AuthSessionProvider';

interface PopularCompany {
  id: number;
  name: string;
  ticker: string;
  sector: string;
  logoUrl: string;
  changeRate: number;
  marketCap?: number;
  watchlisted?: boolean;
}

const TABS = [
  { label: '시가총액', endpoint: '/companies/popular/market-cap' },
  { label: '거래대금', endpoint: '/companies/popular/value' },
  { label: '거래량',   endpoint: '/companies/popular/volume' },
  { label: '상승',     endpoint: '/companies/popular/diff' },
];

const RECENT_SEARCHES_KEY = 'company_recent_searches';
const RECENT_VIEWED_KEY = 'company_recent_viewed';

interface RecentCompany {
  id: number;
  name: string;
  ticker: string;
}
const ROW_HEIGHT = 60;
const VISIBLE_ROWS = 6.5;


function StarButton({ companyId, initialWatchlisted }: { companyId: number; initialWatchlisted: boolean }) {
  const authStatus = useAuthStatus();
  const [watchlisted, setWatchlisted] = useState(initialWatchlisted);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (authStatus !== 'authenticated' || loading) return;
    setLoading(true);
    try {
      if (watchlisted) {
        await apiClient.delete(`/api/users/${companyId}/watch`);
      } else {
        await apiClient.post(`/api/users/${companyId}/watch`);
      }
      setWatchlisted(prev => !prev);
    } catch {
      alert('요청에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (authStatus !== 'authenticated') return null;

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="shrink-0 p-4pxr text-text-muted transition-colors hover:text-yellow-400 disabled:opacity-50">
      <svg width="14" height="14" viewBox="0 0 24 24" fill={watchlisted ? '#FBBF24' : 'none'} stroke={watchlisted ? '#FBBF24' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}

function CompanyRow({ company, rank }: { company: PopularCompany; rank: number }) {
  const router = useRouter();
  const isRise = company.changeRate > 0;
  const isFall = company.changeRate < 0;
  const [imgError, setImgError] = useState(false);
  const logoSrc = !imgError && company.logoUrl ? company.logoUrl : '/default-company.png';

  return (
    <div
      onClick={() => router.push(`/companies/${company.id}`)}
      className="flex cursor-pointer items-center gap-12pxr px-20pxr py-12pxr transition-colors hover:bg-surface-bg">
      <StarButton companyId={company.id} initialWatchlisted={company.watchlisted ?? false} />
      <span className={`w-18pxr shrink-0 text-[13px] font-black ${rank <= 3 ? 'text-primary-dark' : 'text-text-tertiary'}`}>
        {rank}
      </span>
      <div className="relative h-36pxr w-36pxr shrink-0 overflow-hidden rounded-full border border-surface-border bg-surface-bg">
        <Image src={logoSrc} alt={company.name} fill className="object-cover" onError={() => setImgError(true)} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-bold text-text-primary">{company.name}</p>
        {company.marketCap != null
          ? <p className="text-[11px] text-text-muted">{company.marketCap.toLocaleString()}억</p>
          : <p className="text-[11px] text-text-muted">{company.sector ?? '기타'}</p>
        }
      </div>
      <p className={`shrink-0 text-[13px] font-bold ${isRise ? 'text-semantic-red' : isFall ? 'text-semantic-blue' : 'text-text-secondary'}`}>
        {isRise ? '+' : ''}{company.changeRate.toFixed(2)}%
      </p>
    </div>
  );
}

function RankingPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [cache, setCache] = useState<Record<number, PopularCompany[]>>({});
  const [loading, setLoading] = useState(true);
  const fetchedTabs = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (fetchedTabs.current.has(activeTab)) return;
    fetchedTabs.current.add(activeTab);
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${TABS[activeTab].endpoint}`)
      .then(res => res.text())
      .then(text => {
        if (!text) return;
        try {
          const data = JSON.parse(text).result ?? [];
          setCache(prev => ({ ...prev, [activeTab]: data }));
        } catch {}
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab]);

  const companies = cache[activeTab] ?? [];
  const isLoading = loading && companies.length === 0;

  return (
    <div className="overflow-hidden rounded-card border border-surface-border bg-surface-white">
      {/* 탭 */}
      <div className="flex border-b border-surface-border">
        {TABS.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-12pxr text-[13px] font-bold transition-colors ${
              activeTab === index
                ? 'border-b-2 border-primary-dark text-primary-dark'
                : 'text-text-secondary hover:text-text-primary'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 목록 */}
      {isLoading ? (
        <div className="py-40pxr text-center text-[13px] text-text-muted">로딩중...</div>
      ) : companies.length === 0 ? (
        <div className="py-40pxr text-center text-[13px] text-text-muted">데이터가 없어요.</div>
      ) : (
        <div
          className="scrollbar-hide divide-y divide-surface-border overflow-y-auto"
          style={{ maxHeight: ROW_HEIGHT * VISIBLE_ROWS }}>
          {companies.map((company, index) => (
            <CompanyRow key={company.id} company={company} rank={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function RecentViewedCompanies({ companies }: { companies: RecentCompany[] }) {
  const router = useRouter();
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  if (companies.length === 0) return null;

  return (
    <div>
      <p className="mb-12pxr text-[12px] font-black text-text-muted">최근 본 기업</p>
      <div className="scrollbar-hide flex gap-28pxr overflow-x-auto pb-4pxr">
        {companies.map((company) => {
          const tossUrl = company.ticker
            ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${company.ticker}.png`
            : null;
          const logoSrc = !imgErrors[company.id] && tossUrl ? tossUrl : '/default-company.png';
          return (
            <button
              key={company.id}
              onClick={() => router.push(`/companies/${company.id}`)}
              className="flex shrink-0 flex-col items-center gap-8pxr transition-opacity hover:opacity-70">
              <div className="relative h-80pxr w-80pxr overflow-hidden rounded-full border border-surface-border bg-surface-bg">
                <Image
                  src={logoSrc}
                  alt={company.name}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={() => setImgErrors(prev => ({ ...prev, [company.id]: true }))}
                />
              </div>
              <p className="w-80pxr truncate text-center text-[12px] font-bold text-text-primary">{company.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentViewed, setRecentViewed] = useState<RecentCompany[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {}
    try {
      const stored = localStorage.getItem(RECENT_VIEWED_KEY);
      if (stored) setRecentViewed(JSON.parse(stored));
    } catch {}
  }, []);

  const refreshRecentSearches = () => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      setRecentSearches(stored ? JSON.parse(stored) : []);
    } catch {}
  };

  const removeRecent = (query: string) => {
    const next = recentSearches.filter(q => q !== query);
    setRecentSearches(next);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  };

  return (
    <main className="flex h-full w-full flex-col py-36pxr">
      <h1 className="fonts-heading3 pb-16pxr">기업 찾기</h1>

      <div className="grid grid-cols-1 gap-16pxr lg:grid-cols-2">
        {/* 왼쪽: 검색 + 최근 검색어 + 최근 본 기업 */}
        <div className="flex flex-col gap-16pxr">
          <CompanySearchInput onSearch={refreshRecentSearches} />

          {(recentSearches.length > 0 || recentViewed.length > 0) && (
            <div className="rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
              {recentSearches.length > 0 && (
                <div className={recentViewed.length > 0 ? 'mb-28pxr' : ''}>
                  <p className="mb-10pxr text-[12px] font-black text-text-muted">최근 검색어</p>
                  <div className="flex flex-wrap gap-8pxr">
                    {recentSearches.map((q) => (
                      <div key={q} className="flex items-center gap-10pxr rounded-pill bg-[#EFF6FF] px-12pxr py-6pxr">
                        <button
                          onClick={() => router.push(`/companies/result?q=${encodeURIComponent(q)}`)}
                          className="text-[13px] text-[#1E3A8A]">
                          {q}
                        </button>
                        <button onClick={() => removeRecent(q)} className="text-[#1E3A8A]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="1" y1="1" x2="9" y2="9" />
                            <line x1="9" y1="1" x2="1" y2="9" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <RecentViewedCompanies companies={recentViewed} />
            </div>
          )}
        </div>

        {/* 오른쪽: 순위 패널 */}
        <RankingPanel />
      </div>
    </main>
  );
}

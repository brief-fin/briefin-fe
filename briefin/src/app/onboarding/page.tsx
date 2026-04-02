'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CompanyCard from '@/components/onboarding/company-card';
import { usePopularCompanies } from '@/hooks/useCompany';
import type { CompanyDetail } from '@/types/company';
import { watchCompany } from '@/api/userApi';
import { searchCompanies } from '@/api/companyApi';
import { useWatchlist } from '@/hooks/useUser';
import { useAuthStatus } from '@/providers/AuthSessionProvider';
import { useQueryClient } from '@tanstack/react-query';

const NEXT_PAGE = '/home';

interface SearchResult {
  id: number;
  name: string;
  ticker?: string;
  logoUrl?: string | null;
  sector?: string | null;
  changeRate?: number | null;
}

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Record<string, Pick<CompanyDetail, 'id' | 'name' | 'ticker'>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const didInteractRef = useRef(false);
  const authStatus = useAuthStatus();

  // 검색 자동완성 상태
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchImgErrors, setSearchImgErrors] = useState<Record<number, boolean>>({});
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // 검색 디바운스
  useEffect(() => {
    if (!q.trim()) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearchLoading(true);
      setSearchOpen(true);
      try {
        const res = await searchCompanies(q.trim(), 0, 8);
        setSearchResults(res.content);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const { data: popular, isLoading: popularLoading } = usePopularCompanies();
  const { data: watchlist } = useWatchlist({ enabled: authStatus === 'authenticated' });

  const popularCompanies = (popular?.content ?? []).slice(0, 9);

  const selectedIds = Object.keys(selected);

  // 온보딩 재진입 시: 서버 watchlist를 초기 선택으로 동기화
  // useEffect(() => {
  //   if (authStatus !== 'authenticated') return;
  //   if (!watchlist || watchlist.length === 0) return;
  //   if (didInteractRef.current) return;
  //   if (Object.keys(selected).length > 0) return;

  //   const next: Record<string, Pick<CompanyDetail, 'id' | 'name' | 'ticker'>> = {};
  //   for (const c of watchlist) {
  //     const id = String(c.companyId);
  //     next[id] = { id: c.companyId, name: c.companyName ?? c.name ?? '', ticker: c.ticker };
  //   }
  //   queueMicrotask(() => setSelected(next));
  // }, [authStatus, selected, watchlist]);

  const toggle = (company: Pick<CompanyDetail, 'id' | 'name' | 'ticker'> & { logoUrl?: string }) => {
    const id = String(company.id);
    didInteractRef.current = true;
    setSelected((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = { id: company.id, name: company.name, ticker: company.ticker, logoUrl: company.logoUrl };
      return next;
    });
  };

  const handleSearchSelect = (company: SearchResult) => {
    toggle({ id: company.id, name: company.name, ticker: company.ticker ?? '', logoUrl: company.logoUrl ?? '' });
    setQ('');
    setSearchOpen(false);
  };

  const goNext = async () => {
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);

    try {
      const ids = selectedIds.map((id) => Number(id)).filter((n) => Number.isFinite(n));
      if (ids.length > 0) {
        const results = await Promise.allSettled(ids.map((id) => watchCompany(id)));
        const failed = results.filter((r) => r.status === 'rejected').length;
        if (failed > 0) throw new Error('failed');
      }
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user', 'watchlist'] }),
        queryClient.invalidateQueries({ queryKey: ['feed'] }),
      ]);
      router.push(NEXT_PAGE);
    } catch {
      setSubmitError('관심 기업 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLater = () => {
    router.push(NEXT_PAGE);
  };

  const rankedCompanies = [...popularCompanies].sort((a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0));
  const popularIds = new Set(popularCompanies.map((c) => String(c.id)));
  const extraSelected = selectedIds.filter((id) => !popularIds.has(id));
  const scrollList = [...rankedCompanies, ...rankedCompanies];
  const ITEM_H = 44;
  const VISIBLE = 9;

  if (!isHydrated) return null;

  return (
    <main className="min-h-screen bg-surface-bg py-36pxr">
      <div className="mx-auto w-full max-w-1600pxr px-20pxr sm:px-36pxr lg:px-130pxr">
        <div className="grid gap-16pxr lg:grid-cols-[360px_1fr] lg:gap-24pxr">
          {/* Left panel */}
          <aside className="flex flex-col rounded-card border border-surface-border bg-surface-white p-24pxr lg:sticky lg:top-24pxr lg:h-fit lg:min-h-[560px]">
            <div>
              <h1 className="fonts-heading2 mt-14pxr text-text-primary">관심 기업 선택</h1>
              <p className="mt-10pxr text-[14px] leading-relaxed text-text-muted">
                선택한 기업의 공시 뉴스를 맞춤으로 보여드려요.
                <br />
                시가총액 상위 기업 9개를 먼저 보여드리고,
                <br />
                검색으로 더 추가할 수 있어요.
              </p>
            </div>

            {/* 시가총액 순위 슬라이드 */}
            <div className="mt-20pxr flex-1 overflow-hidden rounded-xl border border-surface-border bg-surface-bg">
              <div className="border-b border-surface-border px-14pxr py-10pxr">
                <p className="text-[11px] font-bold text-text-muted">시가총액 순위</p>
              </div>
              <div className="overflow-hidden" style={{ height: ITEM_H * VISIBLE }}>
                {popularLoading ? (
                  <div className="flex flex-col">
                    {[...Array(VISIBLE)].map((_, i) => (
                      <div key={i} className="flex items-center gap-10pxr px-14pxr" style={{ height: ITEM_H }}>
                        <div className="h-10pxr w-6 animate-pulse rounded bg-surface-border" />
                        <div className="h-10pxr w-20 animate-pulse rounded bg-surface-border" />
                        <div className="ml-auto h-10pxr w-12 animate-pulse rounded bg-surface-border" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="flex flex-col"
                    style={{
                      animation:
                        rankedCompanies.length > 0
                          ? `scrollUp ${rankedCompanies.length * 1.8}s linear infinite`
                          : 'none',
                    }}>
                    {scrollList.map((company, i) => {
                      const rank = (i % rankedCompanies.length) + 1;
                      const isRise = (company.changeRate ?? 0) > 0;
                      const isFall = (company.changeRate ?? 0) < 0;
                      return (
                        <div
                          key={`${company.id}-${i}`}
                          className="flex shrink-0 items-center gap-10pxr px-14pxr"
                          style={{ height: ITEM_H }}>
                          <span className="w-16pxr shrink-0 text-[11px] font-bold text-text-muted">{rank}</span>
                          <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-text-primary">
                            {company.name}
                          </span>
                          {company.changeRate != null && (
                            <span
                              className={`shrink-0 text-[12px] font-bold ${isRise ? 'text-semantic-red' : isFall ? 'text-semantic-blue' : 'text-text-secondary'}`}>
                              {isRise ? '+' : ''}
                              {company.changeRate.toFixed(2)}%
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right content */}
          <section className="rounded-card border border-surface-border bg-surface-white p-24pxr lg:min-h-[560px]">
            {/* 검색창 */}
            <div ref={searchContainerRef} className="relative mb-24pxr">
              <div className="flex w-full items-center gap-8pxr rounded-input border border-surface-border bg-surface-white px-16pxr py-12pxr">
                <input
                  className="w-full bg-transparent p-5pxr text-text-primary placeholder:text-text-muted focus:outline-none"
                  type="text"
                  placeholder="기업명, 티커를 검색해 추가하세요"
                  value={q}
                  onChange={(e) => setQ(e.currentTarget.value)}
                  onFocus={() => {
                    if (q.trim() && searchResults.length > 0) setSearchOpen(true);
                  }}
                />
                {q ? (
                  <button
                    onClick={() => {
                      setQ('');
                      setSearchOpen(false);
                    }}
                    className="shrink-0 text-text-muted hover:text-text-primary">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round">
                      <line x1="1" y1="1" x2="9" y2="9" />
                      <line x1="9" y1="1" x2="1" y2="9" />
                    </svg>
                  </button>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                )}
              </div>

              {/* 자동완성 드롭다운 */}
              {searchOpen && q.trim() && (
                <div className="absolute left-0 right-0 top-full z-50 mt-4pxr overflow-hidden rounded-card border border-surface-border bg-surface-white shadow-lg">
                  {searchLoading ? (
                    <p className="py-16pxr text-center text-[13px] text-text-muted">검색 중...</p>
                  ) : searchResults.length === 0 ? (
                    <p className="py-16pxr text-center text-[13px] text-text-muted">검색 결과가 없어요.</p>
                  ) : (
                    <ul
                      className="scrollbar-hide divide-y divide-surface-border overflow-y-auto"
                      style={{ maxHeight: 52 * 6.5 }}>
                      {searchResults.map((company) => {
                        const isRise = (company.changeRate ?? 0) > 0;
                        const isFall = (company.changeRate ?? 0) < 0;
                        const hasLogo = !!company.logoUrl && !searchImgErrors[company.id];
                        return (
                          <li key={company.id}>
                            <button
                              onClick={() => handleSearchSelect(company)}
                              className="flex w-full items-center gap-12pxr px-16pxr py-10pxr text-left transition-colors hover:bg-surface-bg">
                              <div className="relative h-32pxr w-32pxr shrink-0 overflow-hidden rounded-full border border-surface-border">
                                {hasLogo ? (
                                  <Image
                                    src={company.logoUrl!}
                                    alt={company.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    onError={() => setSearchImgErrors((prev) => ({ ...prev, [company.id]: true }))}
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
                                    <span className="text-[13px] font-black text-white">{company.name.charAt(0)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-bold text-text-primary">{company.name}</p>
                                <p className="text-[11px] text-text-muted">{company.sector ?? '기타'}</p>
                              </div>
                              {company.changeRate != null && (
                                <p
                                  className={`shrink-0 text-[12px] font-bold ${isRise ? 'text-semantic-red' : isFall ? 'text-semantic-blue' : 'text-text-secondary'}`}>
                                  {isRise ? '+' : ''}
                                  {company.changeRate.toFixed(2)}%
                                </p>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* 선택한 기업 태그 */}
            <div className="mb-20pxr flex min-h-36pxr flex-wrap gap-6pxr">
              {selectedIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(selected[id])}
                  className="inline-flex items-center gap-4pxr rounded-full border border-primary bg-primary-subtle px-10pxr py-5pxr text-[12px] font-bold text-primary transition-colors hover:bg-primary-light">
                  {selected[id]?.name ?? `#${id}`}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round">
                    <line x1="1" y1="1" x2="9" y2="9" />
                    <line x1="9" y1="1" x2="1" y2="9" />
                  </svg>
                </button>
              ))}
            </div>

            {/* 기업 카드 그리드 */}
            <div className="grid grid-cols-2 gap-12pxr sm:grid-cols-3 lg:grid-cols-3 lg:gap-12pxr">
              {popularLoading ? (
                [...Array(9)].map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="flex h-80pxr w-full items-center rounded-xl border border-surface-border bg-surface-bg px-16pxr">
                    <div className="size-[44px] animate-pulse rounded-xl bg-surface-border" />
                    <div className="ml-12pxr flex-1 space-y-6pxr">
                      <div className="h-12pxr w-24 animate-pulse rounded bg-surface-border" />
                      <div className="h-10pxr w-16 animate-pulse rounded bg-surface-border" />
                    </div>
                  </div>
                ))
              ) : popularCompanies.length === 0 ? (
                <div className="col-span-2 rounded-xl border border-surface-border bg-surface-bg p-20pxr text-center sm:col-span-3">
                  <p className="text-[14px] font-bold text-text-primary">인기 기업 정보가 없습니다.</p>
                </div>
              ) : (
                <>
                  {popularCompanies.map((company) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      selected={selectedIds.includes(String(company.id))}
                      onToggle={() => toggle(company)}
                    />
                  ))}
                  {extraSelected.map((id) => (
                    <CompanyCard
                      key={id}
                      company={{
                        id: Number(id),
                        name: selected[id]?.name ?? '',
                        ticker: selected[id]?.ticker ?? '',
                        logoUrl: selected[id]?.logoUrl ?? '',
                      }}
                      selected={true}
                      onToggle={() => toggle(selected[id])}
                    />
                  ))}
                </>
              )}
            </div>

            <div className="mt-24pxr flex flex-col gap-10pxr">
              <button
                type="button"
                onClick={goNext}
                disabled={submitting}
                className="flex h-42pxr w-full items-center rounded-button bg-primary px-16pxr text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
                <span className="flex-1 text-center">{submitting ? '저장 중…' : '시작하기'}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              {submitError && <p className="text-[13px] font-bold text-semantic-red">{submitError}</p>}
              <button
                type="button"
                onClick={handleLater}
                className="w-full text-[13px] font-bold text-text-muted transition-colors hover:text-text-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-surface-border">
                나중에 하기
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

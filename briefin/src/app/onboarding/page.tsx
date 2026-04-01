'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import CompanyCard from '@/components/onboarding/company-card';
import { usePopularCompanies } from '@/hooks/useCompany';
import type { CompanyDetail } from '@/types/company';
import { unwatchCompany, watchCompany } from '@/api/userApi';
import { useWatchlist } from '@/hooks/useUser';
import { useAuthStatus } from '@/providers/AuthSessionProvider';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/api/client';

const NEXT_PAGE = '/home';

interface SearchResult {
  id: number;
  name: string;
  ticker?: string;
  logoUrl?: string | null;
}

interface SearchPage {
  content: SearchResult[];
}

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Record<string, Pick<CompanyDetail, 'id' | 'name' | 'ticker'>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const didInteractRef = useRef(false);
  const authStatus = useAuthStatus();

  // 검색 자동완성 상태
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
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
        const res = await apiClient.get<ApiResponse<SearchPage>>(
          `/companies/search?q=${encodeURIComponent(q.trim())}&size=8`,
        );
        setSearchResults(res.result.content ?? []);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 250);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
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
  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    if (!watchlist) return;
    if (didInteractRef.current) return;
    if (Object.keys(selected).length > 0) return;

    const next: Record<string, Pick<CompanyDetail, 'id' | 'name' | 'ticker'>> = {};
    for (const c of watchlist) {
      const id = String(c.companyId);
      next[id] = { id: c.companyId, name: c.companyName ?? c.name ?? '', ticker: c.ticker };
    }
    queueMicrotask(() => setSelected(next));
  }, [authStatus, selected, watchlist]);

  const toggle = (company: Pick<CompanyDetail, 'id' | 'name' | 'ticker'>) => {
    const id = String(company.id);
    didInteractRef.current = true;
    setSelected((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = { id: company.id, name: company.name, ticker: company.ticker };
      return next;
    });
  };

  const handleSearchSelect = (company: SearchResult) => {
    toggle({ id: company.id, name: company.name, ticker: company.ticker ?? '' });
    setQ('');
    setSearchOpen(false);
  };

  const resetAll = async () => {
    if (resetting || submitting) return;
    setResetError(null);
    setResetting(true);
    didInteractRef.current = true;

    try {
      if (authStatus === 'authenticated' && watchlist && watchlist.length > 0) {
        const ids = watchlist.map((c) => c.companyId);
        const results = await Promise.allSettled(ids.map((id) => unwatchCompany(id)));
        const failed = results.filter((r) => r.status === 'rejected').length;
        if (failed > 0) throw new Error('failed');
        await queryClient.invalidateQueries({ queryKey: ['user', 'watchlist'] });
      }
      setSelected({});
    } catch {
      setSelected({});
      setResetError('관심 기업 초기화에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setResetting(false);
    }
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

  if (!isHydrated) return null;

  return (
    <main className="min-h-screen bg-surface-bg py-36pxr">
      <div className="mx-auto w-full max-w-1600pxr px-20pxr sm:px-36pxr lg:px-130pxr">
        <div className="grid gap-16pxr lg:grid-cols-[360px_1fr] lg:gap-24pxr">
          {/* Left panel */}
          <aside className="rounded-card border border-surface-border bg-surface-white p-24pxr lg:sticky lg:top-24pxr lg:h-fit">
            <div>
              <p className="text-[34px] leading-none text-text-primary">🏢</p>
              <h1 className="fonts-heading2 mt-14pxr text-text-primary">관심 기업 선택</h1>
              <p className="mt-10pxr text-[14px] leading-relaxed text-text-muted">
                선택한 기업의 공시 뉴스를 맞춤으로 보여드려요.<br />
                인기 기업 9개를 먼저 보여드리고,<br />
                검색으로 더 추가할 수 있어요.
              </p>
            </div>

            <div className="mt-14pxr rounded-xl border border-surface-border bg-surface-bg p-14pxr">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-bold text-text-secondary">선택한 기업</p>
                <p className="text-[12px] font-bold text-text-muted">{selectedIds.length}개</p>
              </div>
              {selectedIds.length === 0 ? (
                <p className="mt-10pxr text-[13px] text-text-muted">
                  아직 선택한 기업이 없어요. 인기 기업을 선택하거나 검색으로 추가해보세요.
                </p>
              ) : (
                <div className="mt-10pxr flex flex-wrap gap-8pxr">
                  {selectedIds.slice(0, 6).map((id) => (
                    <span
                      key={id}
                      className="inline-flex items-center rounded-full border border-surface-border bg-surface-white px-10pxr py-6pxr text-[12px] font-bold text-text-secondary"
                    >
                      {selected[id]?.name ?? `#${id}`}
                    </span>
                  ))}
                  {selectedIds.length > 6 && (
                    <span className="inline-flex items-center rounded-full border border-surface-border bg-surface-white px-10pxr py-6pxr text-[12px] font-bold text-text-muted">
                      +{selectedIds.length - 6}
                    </span>
                  )}
                </div>
              )}
              <div className="mt-12pxr flex items-center gap-10pxr">
                <button
                  type="button"
                  onClick={resetAll}
                  disabled={selectedIds.length === 0 || resetting || submitting}
                  className="h-38pxr flex-1 rounded-button border border-surface-border bg-surface-white text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resetting ? '초기화 중…' : '선택 초기화'}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={submitting}
                  className="h-38pxr flex-1 rounded-button bg-primary text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? '저장 중…' : '시작하기'}
                </button>
              </div>
              {submitError && <p className="mt-10pxr text-[13px] font-bold text-semantic-red">{submitError}</p>}
              {resetError && <p className="mt-10pxr text-[13px] font-bold text-semantic-red">{resetError}</p>}
            </div>

            <div className="mt-16pxr">
              <button
                type="button"
                onClick={handleLater}
                className="w-full text-[13px] font-bold text-text-muted transition-colors hover:text-text-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-surface-border"
              >
                나중에 하기
              </button>
            </div>
          </aside>

          {/* Right content */}
          <section className="rounded-card border border-surface-border bg-surface-white p-24pxr">
            {/* 검색창 */}
            <div ref={searchContainerRef} className="relative mb-24pxr">
              <div className="flex w-full items-center gap-8pxr rounded-input border border-gray-300 bg-surface-white px-16pxr py-12pxr">
                <input
                  className="w-full bg-transparent p-5pxr text-text-primary placeholder:text-text-muted focus:outline-none"
                  type="text"
                  placeholder="기업명, 티커를 검색해 추가하세요"
                  value={q}
                  onChange={(e) => setQ(e.currentTarget.value)}
                  onFocus={() => { if (q.trim() && searchResults.length > 0) setSearchOpen(true); }}
                />
                {q ? (
                  <button onClick={() => { setQ(''); setSearchOpen(false); }} className="shrink-0 text-text-muted hover:text-text-primary">
                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="1" y1="1" x2="9" y2="9" /><line x1="9" y1="1" x2="1" y2="9" />
                    </svg>
                  </button>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <ul className="divide-y divide-surface-border overflow-y-auto" style={{ maxHeight: 52 * 6 }}>
                      {searchResults.map((company) => {
                        const isSelected = !!selected[String(company.id)];
                        return (
                          <li key={company.id}>
                            <button
                              onClick={() => handleSearchSelect(company)}
                              className="flex w-full items-center gap-12pxr px-16pxr py-10pxr text-left transition-colors hover:bg-surface-bg"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-bold text-text-primary">
                                  {company.name}{company.ticker ? ` · ${company.ticker}` : ''}
                                </p>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* 인기 기업 헤더 */}
            <div className="mb-16pxr">
              <p className="text-[12px] font-bold text-text-secondary">인기 기업</p>
            </div>

            {/* 기업 카드 그리드 */}
            <div className="grid grid-cols-2 gap-12pxr sm:grid-cols-3 lg:grid-cols-3 lg:gap-12pxr">
              {popularLoading ? (
                [...Array(9)].map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="flex h-80pxr w-full items-center rounded-xl border border-surface-border bg-surface-bg px-16pxr"
                  >
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
                popularCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    selected={selectedIds.includes(String(company.id))}
                    onToggle={() => toggle(company)}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

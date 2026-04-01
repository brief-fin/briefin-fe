'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import CompanyCard from '@/components/onboarding/company-card';
import { useCompanySearch, usePopularCompanies } from '@/hooks/useCompany';
import type { CompanyDetail } from '@/types/company';
import { unwatchCompany, watchCompany } from '@/api/userApi';
import { useWatchlist } from '@/hooks/useUser';
import { useAuthStatus } from '@/providers/AuthSessionProvider';
import { useQueryClient } from '@tanstack/react-query';

const NEXT_PAGE = '/feed';

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Record<string, Pick<CompanyDetail, 'id' | 'name' | 'ticker'>>>({});
  const selectedRef = useRef(selected);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const didInteractRef = useRef(false);
  const authStatus = useAuthStatus();
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 250);
    return () => clearTimeout(t);
  }, [q]);

  const { data: popular, isLoading: popularLoading } = usePopularCompanies();
  const { data: searched, isLoading: searchLoading } = useCompanySearch(debouncedQ);
  const { data: watchlist } = useWatchlist({ enabled: authStatus === 'authenticated' });

  const companies: CompanyDetail[] = useMemo(() => {
    if (debouncedQ.length > 0) return searched?.content ?? [];
    return (popular?.content ?? []).slice(0, 9);
  }, [debouncedQ, popular, searched]);

  const isLoading = debouncedQ.length > 0 ? searchLoading : popularLoading;

  const selectedIds = useMemo(() => Object.keys(selected), [selected]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

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

  const resetAll = async () => {
    if (resetting || submitting) return;
    setResetError(null);
    setResetting(true);
    didInteractRef.current = true;

    try {
      // 서버에 이미 담긴 watchlist는 언워치까지 수행해 "진짜 초기화"
      if (authStatus === 'authenticated' && watchlist && watchlist.length > 0) {
        const ids = watchlist.map((c) => c.companyId);
        const results = await Promise.allSettled(ids.map((id) => unwatchCompany(id)));
        const failed = results.filter((r) => r.status === 'rejected').length;
        if (failed > 0) {
          throw new Error('failed');
        }
        await queryClient.invalidateQueries({ queryKey: ['user', 'watchlist'] });
      }

      setSelected({});
    } catch {
      // 서버 초기화 실패여도 화면 선택은 비우되, 안내는 남김
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
      if (authStatus === 'authenticated') {
        const desiredIds = Object.keys(selectedRef.current)
          .map((id) => Number(id))
          .filter((n) => Number.isFinite(n));

        const currentIds = (watchlist ?? [])
          .map((c) => Number(c.companyId))
          .filter((n) => Number.isFinite(n));

        const desiredSet = new Set(desiredIds);
        const currentSet = new Set(currentIds);

        const toWatch = desiredIds.filter((id) => !currentSet.has(id));
        const toUnwatch = currentIds.filter((id) => !desiredSet.has(id));

        if (toUnwatch.length > 0) {
          const results = await Promise.allSettled(toUnwatch.map((id) => unwatchCompany(id)));
          const failed = results.filter((r) => r.status === 'rejected').length;
          if (failed > 0) throw new Error('failed');
        }

        if (toWatch.length > 0) {
          const results = await Promise.allSettled(toWatch.map((id) => watchCompany(id)));
          const failed = results.filter((r) => r.status === 'rejected').length;
          if (failed > 0) throw new Error('failed');
        }
      }

      // 저장 직후 UI 반영이 느리지 않도록 캐시 갱신
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

  if (!isHydrated) {
    return null;
  }

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
                선택한 기업의 뉴스·공시를 맞춤으로 보여드려요. 인기 기업 9개를 먼저 보여드리고, 검색으로 더 추가할 수 있어요.
              </p>
            </div>

            <div className="mt-16pxr">
              <p className="mb-8pxr text-[12px] font-bold text-text-secondary">기업 검색</p>
              <div className="flex w-full items-center gap-8pxr rounded-input border border-surface-border bg-surface-white px-16pxr py-12pxr">
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
                <input
                  className="w-full bg-transparent p-5pxr text-text-primary placeholder:text-text-muted focus:outline-none"
                  type="text"
                  placeholder="기업명, 티커를 검색해 추가하세요"
                  value={q}
                  onChange={(e) => setQ(e.currentTarget.value)}
                />
              </div>
              <p className="mt-8pxr text-[12px] text-text-muted">
                {debouncedQ.length > 0 ? `검색 결과 ${companies.length}개` : '인기 기업 9개를 표시 중'}
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
              {submitError && (
                <p className="mt-10pxr text-[13px] font-bold text-semantic-red">{submitError}</p>
              )}
              {resetError && (
                <p className="mt-10pxr text-[13px] font-bold text-semantic-red">{resetError}</p>
              )}
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
            <div className="flex flex-col gap-8pxr sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[12px] font-bold text-text-secondary">
                  {debouncedQ.length > 0 ? '검색 결과' : '인기 기업'}
                </p>
                <h2 className="mt-6pxr text-[18px] font-black text-text-primary">
                  {debouncedQ.length > 0 ? '원하는 기업을 추가해보세요' : '지금 많이 담는 기업'}
                </h2>
              </div>
              <p className="text-[12px] text-text-muted">선택됨: {selectedIds.length}개</p>
            </div>

            <div className="mt-16pxr grid grid-cols-2 gap-12pxr sm:grid-cols-3 lg:grid-cols-3 lg:gap-12pxr">
              {isLoading ? (
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
              ) : companies.length === 0 ? (
                <div className="col-span-2 rounded-xl border border-surface-border bg-surface-bg p-20pxr text-center sm:col-span-3">
                  <p className="text-[14px] font-bold text-text-primary">기업이 없습니다.</p>
                  <p className="mt-6pxr text-[13px] text-text-muted">다른 키워드로 검색해보세요.</p>
                </div>
              ) : (
                companies.map((company) => (
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

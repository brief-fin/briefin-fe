'use client';

import { useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import CompanyCard from '@/components/onboarding/company-card';
import { MOCK_ONBOARDING_COMPANIES, STORAGE_KEY_SELECTED_COMPANIES } from '@/mocks/mock-companies';
import type { Company } from '@/types/company';

const NEXT_PAGE = '/feed';

function loadSelectedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SELECTED_COMPANIES);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSelectedIds(ids: string[]) {
  try {
    if (ids.length > 0) {
      localStorage.setItem(STORAGE_KEY_SELECTED_COMPANIES, JSON.stringify(ids));
    } else {
      localStorage.removeItem(STORAGE_KEY_SELECTED_COMPANIES);
    }
  } catch {
    // ignore
  }
}

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadSelectedIds();
  });
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const toggle = (company: Company) => {
    setSelectedIds((prev) =>
      prev.includes(company.id) ? prev.filter((id) => id !== company.id) : [...prev, company.id],
    );
  };

  const goNext = () => {
    saveSelectedIds(selectedIds);
    router.push(NEXT_PAGE);
  };

  const handleLater = () => {
    router.push(NEXT_PAGE);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <main className="flex h-screen items-center justify-center bg-surface-bg">
      <div className="mx-auto w-full max-w-680pxr">
        <div className="text-center">
          <p className="text-[40px] leading-none text-text-primary sm:text-[48px]">🏢</p>
          <h1 className="sm:text-26pxr mt-14pxr text-[22px] font-black tracking-[-0.5px] text-text-primary sm:mt-18pxr">
            관심 기업을 선택해 주세요
          </h1>
          <p className="mt-6pxr text-[14px] font-normal leading-relaxed text-text-muted sm:text-[15px]">
            선택한 기업의 뉴스·공시를 맞춤으로 보여드려요 (선택 사항)
          </p>
        </div>

        <div className="mt-20pxr grid grid-cols-2 gap-10pxr sm:mt-24pxr sm:grid-cols-3 sm:gap-12pxr">
          {MOCK_ONBOARDING_COMPANIES.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              selected={selectedIds.includes(company.id)}
              onToggle={() => toggle(company)}
            />
          ))}
        </div>

        <div className="mt-24pxr flex flex-col gap-10pxr sm:mt-28pxr sm:gap-12pxr">
          <button
            type="button"
            onClick={goNext}
            className="flex h-48pxr w-full items-center justify-center rounded-button bg-primary text-[14px] font-bold text-white shadow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-50pxr sm:text-[15px]">
            시작하기
          </button>
          <button
            type="button"
            onClick={handleLater}
            className="text-[14px] font-bold text-text-muted transition-colors hover:text-text-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-surface-border sm:text-[15px]">
            나중에 하기
          </button>
        </div>
      </div>
    </main>
  );
}

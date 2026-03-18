'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CompanyCard from '@/components/onboarding/company-card';
import {
  MOCK_ONBOARDING_COMPANIES,
  STORAGE_KEY_SELECTED_COMPANIES,
} from '@/mocks/mock-companies';
import type { Company } from '@/types/company';

function loadSelectedIds(): string[] {
  if (typeof window === 'undefined') return [];
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
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SELECTED_COMPANIES, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSelectedIds(loadSelectedIds());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveSelectedIds(selectedIds);
  }, [selectedIds, mounted]);

  const toggle = (company: Company) => {
    setTouched(true);
    setSelectedIds((prev) =>
      prev.includes(company.id)
        ? prev.filter((id) => id !== company.id)
        : [...prev, company.id]
    );
  };

  const isValid = selectedIds.length >= 1;
  const showError = !isValid;

  const handleSubmit = () => {
    if (!isValid) {
      setTouched(true);
      return;
    }
    router.push('/feed');
  };

  return (
    <main className="min-h-screen bg-surface-bg px-16pxr pb-32pxr pt-40pxr sm:px-24pxr sm:pb-40pxr sm:pt-56pxr md:pt-64pxr lg:px-32pxr lg:pt-71pxr">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="text-center">
          <p className="text-[40px] leading-none text-text-primary sm:text-[48px]">🏢</p>
          <h1 className="mt-16pxr text-[22px] font-black tracking-[-0.5px] text-text-primary sm:mt-23pxr sm:text-[28px]">
            관심 기업을 선택해 주세요
          </h1>
          <p className="mt-6pxr text-[14px] font-normal leading-relaxed text-text-muted sm:mt-4pxr sm:text-[15px] sm:leading-[21px]">
            최소 1개 이상 선택하면 맞춤 피드를 시작할 수 있어요
          </p>
        </div>

        <div className="mt-20pxr grid grid-cols-2 gap-8pxr sm:mt-24pxr sm:gap-12pxr md:gap-16pxr">
          {MOCK_ONBOARDING_COMPANIES.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              selected={selectedIds.includes(company.id)}
              onToggle={() => toggle(company)}
            />
          ))}
        </div>

        {showError && (
          <div
            role="alert"
            className="mt-20pxr flex min-h-[45px] items-center justify-center rounded-button border-2 border-dashed border-primary/60 bg-[#fff5f5] px-12pxr py-10pxr sm:mt-24pxr sm:h-[45px] sm:py-0"
          >
            <p className="text-center text-[12px] font-bold text-semantic-red sm:text-[13px]">
              최소 1개 이상의 기업을 선택해 주세요.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className="mt-20pxr flex h-48pxr w-full items-center justify-center rounded-button bg-primary text-[14px] font-bold leading-tight text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:mt-24pxr sm:h-[52px] sm:text-[15px]"
        >
          피드 시작하기 →
        </button>
      </div>
    </main>
  );
}

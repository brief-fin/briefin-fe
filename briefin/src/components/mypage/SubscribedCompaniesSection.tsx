'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSubscribedCompanies } from '@/api/disclosureApi';
import { AlertIcon } from '@/constants/mypageIcons';
import { unsubscribePush } from '@/lib/pushNotification';

export const SUBSCRIBED_COMPANIES_KEY = ['subscribed-companies'];

interface SubscribedCompany {
  companyId: number;
  name: string;
  ticker: string;
}

function TrashButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="알림 해제"
      aria-label="알림 해제"
      className="flex items-center p-4pxr text-text-muted transition-colors hover:text-red-500 disabled:opacity-40">
      {loading ? (
        <span className="block h-22pxr w-22pxr animate-pulse rounded-full bg-gray-200" />
      ) : (
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      )}
    </button>
  );
}

function CompanyLogo({ company }: { company: SubscribedCompany }) {
  const [imgError, setImgError] = useState(false);
  const tossUrl = company.ticker
    ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${company.ticker}.png`
    : null;
  const src = !imgError && tossUrl ? tossUrl : null;

  if (src) {
    return (
      <Image
        src={src}
        alt={company.name}
        width={52}
        height={52}
        className="object-cover"
        unoptimized
        onError={() => setImgError(true)}
      />
    );
  }
  return <span className="text-[18px]">🏢</span>;
}

export default function SubscribedCompaniesSection() {
  const queryClient = useQueryClient();
  const [unsubscribingIds, setUnsubscribingIds] = useState<Set<number>>(new Set());

  const { data: companies, isLoading, isError } = useQuery({
    queryKey: SUBSCRIBED_COMPANIES_KEY,
    queryFn: fetchSubscribedCompanies,
  });

  const handleUnsubscribe = async (companyId: number) => {
    setUnsubscribingIds((prev) => new Set(prev).add(companyId));
    try {
      await unsubscribePush(companyId);
      queryClient.setQueryData<SubscribedCompany[]>(
        SUBSCRIBED_COMPANIES_KEY,
        (prev) => (prev ?? []).filter((c) => c.companyId !== companyId),
      );
    } catch {
      alert('알림 해제에 실패했습니다.');
    } finally {
      setUnsubscribingIds((prev) => {
        const next = new Set(prev);
        next.delete(companyId);
        return next;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex animate-pulse flex-col gap-12pxr">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-12pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
            <div className="h-52pxr w-52pxr shrink-0 rounded-button bg-gray-200" />
            <div className="flex flex-1 flex-col gap-6pxr">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-200" />
            </div>
            <div className="h-22pxr w-22pxr rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-40pxr text-center text-[14px] text-text-muted">
        목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </p>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <div className="flex flex-col items-center gap-12pxr py-60pxr text-center">
        <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#E5E7EB]">
          <AlertIcon size={22} stroke="#9CA3AF" strokeWidth="2.2" />
        </div>
        <p className="fonts-body font-medium text-text-primary">공시 알림 신청한 기업이 없어요</p>
        <p className="fonts-label text-text-muted">기업 페이지에서 벨 아이콘을 누르면 공시 알림을 받을 수 있어요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12pxr">
      {companies.map((company) => (
        <div
          key={company.companyId}
          className="flex items-center gap-15pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
          <div className="flex h-52pxr w-52pxr shrink-0 items-center justify-center overflow-hidden rounded-button bg-surface-bg">
            <CompanyLogo company={company} />
          </div>
          <Link href={`/companies/${company.companyId}`} className="min-w-0 flex-1 hover:opacity-70">
            <p className="text-[16px] font-bold text-text-primary">{company.name}</p>
          </Link>
          <div className="flex shrink-0 items-center gap-4pxr">
            <TrashButton
              loading={unsubscribingIds.has(company.companyId)}
              onClick={() => handleUnsubscribe(company.companyId)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
